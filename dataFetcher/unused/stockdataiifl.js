
let axios = require('axios');
const { index } = require('cheerio/lib/api/traversing');
const { json } = require('express');
const enc=require('../encry')
//Cuurenlty not using iifl api.
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb+srv://admin:admin@index.yscf1.mongodb.net/index?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   })
//   .then(() => {
//     console.log("connected");
//   })
//   .catch(() => {
//     return new Error("Coonection failed: ");
//   });
// const indexSchema = new mongoose.Schema({
//   name: Array
// });
// const model = mongoose.model("stockList", indexSchema, "stockList");

let stockData=[]
let stocklist=[]

const fs = require('fs')
fs.readFile('./dataFetcher/symbol.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    let map=new Map(); 
    let reverseMap=new Map(); 

    axios.get('http://content.indiainfoline.com/IIFLTT/Scripmaster.csv').then((res)=>{
        var array = res.data.toString().split("\r\n");
let result = [];
let headers = array[0].split(",")
for (let i = 1; i < array.length - 1; i++) {
  let obj = {}
  let str = array[i]
  let properties = str.split(",")
  for (let j in headers) {
    if (properties[j].includes(",")) {
      obj[headers[j]] = properties[j]
        .split(",").map(item => item.trim())
    }
    else obj[headers[j]] = properties[j]
  }
  result.push(obj)
}
        result.forEach(element => {
            map.set(element.Name,element.Scripcode);
            reverseMap.set(element.Scripcode,element.Name);
        });
    }).then(()=>{
        JSON.parse(jsonString).data.forEach(element => {
            if(map.get(element)!==undefined){
                stocklist.push(map.get(element));}
        });

    }).then(async ()=>{
        getData(5).then(()=>{
            let returnList=[]
                    Promise.all(stockData).then((res)=>{
                        console.log(stocklist)
                        res.reverse();
                        let dataList= res.map((data,ind)=>{
                            return({
                              name:  reverseMap.get(stocklist[ind]),
                              data: data
                            })
                        })
                        dataList.forEach((element)=>{
                            console.log(element.name)
                            if(getmacd(element))
                            returnList.push(element.name);
                            
                        })
                        return returnList;
                    }).then((res)=>{
                        console.log(res)
                    }).catch((er)=>{console.log(er)})
                        // model.deleteMany();
                        // new model({name:returnList}).save();
                });
    })
})



function formatDate(d) {
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

async function getData(cnt){
    if(cnt>=0){
        console.log(cnt);

    await new Promise(resolve=>setTimeout(resolve,2000));
        let config = {
          method: 'post',
          url: 'https://dataservice.iifl.in/openapi/prod/LoginRequest',
          headers: { 
            'Ocp-Apim-Subscription-Key': 'fc714d8e5b82438a93a95baa493ff45b', 
            'Content-Type': 'application/json'
          },
          data : JSON.stringify({
            "head": {
              "appName": "IIFLMarSMIT VIJ",
              "appVer": "1.0",
              "key": "W6kComkaGXsPhTpwR4NN7hJ8f5rc3soF",
              "osName": "WEB",
              "requestCode": "IIFLMarRQLoginRequestV2",
              "userId": "M5aC7Ht7EfG",
              "password": "Wms8OICqST1"
            },
            "body": {
              "ClientCode": enc.encrypt('91675224'),
              "Password": enc.encrypt('Smit@1998'),
              "LocalIP": "123.123.123.123",
              "PublicIP": "123.123.123.12",
              "HDSerialNumber": "",
              "MACAddress": "",
              "MachineID": "",
              "VersionNo": "1.0.16.0",
              "RequestNo": 1,
              "My2PIN": enc.encrypt('19980103'),
              "ConnectionType": "1"
            }
          })
        };
       await axios(config).then(async (res)=>{
            let jwt=res.data.body.Token;              
              let config = {
                method: 'post',
                url: 'https://dataservice.iifl.in/openapi/prod/JWTOpenApiValidation',
                headers: { 
                  'Ocp-Apim-Subscription-Key': 'fc714d8e5b82438a93a95baa493ff45b', 
                  'Content-Type': 'application/json' 
                },
                data : JSON.stringify({
                    "ClientCode": "91675224",
                    "JwtCode": `${jwt}`
                  })
              };
              
             await axios(config).then(async ()=>{
                let date=new Date()
                date.setDate(date.getDate()-200);
                formatDate(date)
                let today=new Date();
                let config = {
                  method: 'get',
                  url: `https://dataservice.iifl.in/openapi/prod/historical/n/c/${stocklist[cnt]}/1d?from=${formatDate(date)}&end=${formatDate(today)}`,
                  headers: { 
                    'x-clientcode': ' 91675224', 
                    'x-auth-token': `${jwt}`, 
                    'Ocp-Apim-Subscription-Key': ' fc714d8e5b82438a93a95baa493ff45b'
                  }
                }
            await new Promise(resolve=>setTimeout(resolve,2000));
              stockData.push( axios(config))
              await  getData(--cnt)
             })
           
        }).catch((er)=>{
            console.log(er)})
          
    }


}

function EMACalc(mArray,mRange) {
    var k = 2/(mRange + 1);
    emaArray = [mArray[0]];
    for (var i = 1; i < mArray.length; i++) {
      emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
    }
    return emaArray;
  }

function getmacd(arr){
        if(arr===null || arr.data===null||  arr.data.data===null||  arr.data.data.data===null)
        return false
            let fast=16;
            let slow=22;
            let signal_size=9
            let ticks=arr.data.data.data.map((ele)=>ele[4])
            let new_short=EMACalc(ticks,fast);
            let new_long=EMACalc(ticks,slow);
            let new_macd=[]
                for(let i=slow;i<new_short.length;i++)
                new_macd.push(new_short[i]-new_long[i]);
            
            let signal=EMACalc(new_macd,signal_size)
            //console.log(new_macd,signal)
            let include=false
            for(let i=signal_size;i<signal.length-1;i++)
            {
                    if(new_macd[i]<=signal[i] && new_macd[i+1]>=signal[i+1])
                    include=true
            }
                return include;            
            }
 