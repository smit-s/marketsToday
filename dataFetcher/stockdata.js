let axios = require("axios");
const { index } = require("cheerio/lib/api/traversing");
const { json } = require("express");
const log = require("./log");
const mongoose = require("mongoose");
//For getting analysis.
mongoose
  .connect(
    "mongodb+srv://admin:admin@index.yscf1.mongodb.net/index?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    return new Error("Coonection failed: ");
  });
const indexSchema = new mongoose.Schema({
  name: String,
});
const mdl = mongoose.model("stockList", indexSchema, "stockList");
async function emptyDb(){
if ((await mdl.find().count()) != 0) {
  await mdl.deleteMany();
}
}
emptyDb();
let stockData = [];
let stocklist = [];

let data = JSON.stringify({
  clientcode: "S859046",
  password: "Smit@1998",
});
const fs = require("fs");
fs.readFile("./symbol.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  let map = new Map();
  let reverseMap = new Map();

  axios
    .get(
      "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
    )
    .then((res) => {
      res.data.forEach((element) => {
        if (element.exch_seg === "NSE") {
          map.set(element.symbol, element.token);
          reverseMap.set(element.token, element.symbol);
        }
      });
    })
    .then(() => {
      JSON.parse(jsonString).data.forEach((element) => {
        if (map.get(`${element}-EQ`) != undefined) {
          let stockName = `${element}-EQ`;
          stocklist.push({ stocktkn: map.get(stockName), stockName:element });
        }
      });
    })
    .then(async () => {
      getData(stocklist.length-1);
    })
    .catch((er) => {
      console.log(er);
    });
  // model.deleteMany();
  // new model({name:returnList}).save();
});

function formatDate(d) {
  (month = "" + (d.getMonth() + 1)),
    (day = "" + d.getDate()),
    (year = d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-") + " 09:00";
}

async function getData(cnt) {
  if (cnt >= 0) {
    console.log(cnt);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    let config = {
      method: "post",
      url: "https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-UserType": "USER",
        "X-SourceID": "WEB",
        "X-ClientLocalIP": "CLIENT_LOCAL_IP",
        "X-ClientPublicIP": "CLIENT_PUBLIC_IP",
        "X-MACAddress": "MAC_ADDRESS",
        "X-PrivateKey": "cMUf87gC",
      },
      data: data,
    };
    await axios(config)
      .then(async (res) => {
        let jwt = res.data.data.jwtToken;
        let date = new Date();
        date.setDate(date.getDate() - 100);
        formatDate(date);
        let today = new Date();
        let stockQuery = JSON.stringify({
          exchange: "NSE",
          symboltoken: stocklist[cnt]['stocktkn'],
          interval: "ONE_DAY",
          fromdate: formatDate(date),
          todate: formatDate(today),
        });
        let config = {
          method: "post",
          url: "https://apiconnect.angelbroking.com/rest/secure/angelbroking/historical/v1/getCandleData",
          headers: {
            "X-PrivateKey": "cMUf87gC",
            Accept: "application/json",
            "X-SourceID": "WEB",
            "X-ClientLocalIP": "",
            "X-ClientPublicIP": "",
            "X-MACAddress": "",
            "X-UserType": "USER",
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data: stockQuery,
        };
        await new Promise((resolve) => setTimeout(resolve, 3000));
        axios(config)
          .then(async(res) => {
            console.log(stocklist[cnt]['stockName']);
            log.info(stocklist[cnt]['stockName']);
            if (getmacd(res)) {
              await new mdl({ name:stocklist[cnt]['stockName']}).save();
            }

          })
          .catch((er) => {
            console.log(er);
          });
        // model.deleteMany();
        // new model({name:returnList}).save();
        await getData(--cnt);
      })
      .catch(async(er) => {
        console.log(er);
        await getData(--cnt);
      });
  }
  return;
}

function EMACalc(mArray, mRange) {
  var k = 2 / (mRange + 1);
  emaArray = [mArray[0]];
  for (var i = 1; i < mArray.length; i++) {
    emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray;
}

function getmacd(arr) {
  if (
    arr === null ||
    arr.data === null ||
    arr.data.data === null ||
    arr.data.data.data === null
  )
    return false;
  let fast = 16;
  let slow = 22;
  let signal_size = 9;
  let ticks = arr.data.data.map((ele) => ele[4]);
  let new_short = EMACalc(ticks, fast);
  let new_long = EMACalc(ticks, slow);
  let new_macd = [];
  for (let i = slow; i < new_short.length; i++)
    new_macd.push(new_short[i] - new_long[i]);

  let signal = EMACalc(new_macd, signal_size);
  log.info(signal);
  log.info(new_macd);

  let include = false;
  for (let i = signal.length - 4; i < signal.length - 1; i++) {
    console.log(
      `old_macd - ${new_macd[i]}, old_signal- ${signal[i]}  new_macd - ${
        new_macd[i + 1]
      }, new_signal- ${signal[i + 1]}`
    );
    if (new_macd[i] <= signal[i] && new_macd[i + 1] >= signal[i + 1]) {
      include = true;
    }
  }
  return include;
}
