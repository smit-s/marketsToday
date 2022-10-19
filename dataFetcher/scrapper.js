const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

//Fetch data from investing.com
mongoose.connect("mongodb+srv://admin:admin@index.yscf1.mongodb.net/index?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) .then(() => {
    console.log("connected");
  }) .catch(() => {
    return new Error("Coonection failed: ");
  });
const indexSchema = new mongoose.Schema({lst:Array});
const wm = mongoose.model("wm", indexSchema, "wm");
const indexList=['germany-30','uk-100','shanghai-composite','japan-ni225','hang-sen-40','india-50-futures','us-30','nasdaq-composite','us-30-futures']
const dindex=['us-dollar-index'];

async function getDetails(response, index,res) {
    const $ =await cheerio.load(response.data);
    obj = {
        ltp: $(".last-price-value").text(),
        cng: $(".last-diff-value").text(),
        nc: $(".last-diff-percent").text(),
        index_name: `${index}`
    };
    res.push(obj);
}
  cnt=0;
async function main( ){
 let res=[];
let promises=[];
await dindex.forEach(index => {
    promises.push(  axios.get(`https://in.investing.com/currencies/${index}`).then((response) => {
      getDetails(response, index,res);
    })
)});

await indexList.forEach(index => {
    promises.push(  axios.get(`https://in.investing.com/indices/${index}`).then((response) => {
      getDetails(response, index,res);
    }))
});
await Promise.all(promises).then(async()=>{
  console.log(res)
    console.log(cnt)
    cnt+=1;
}).then(async()=>{
    if(res.length>0){
 if ((await wm.find().count()) === 0) {
  await new wm(res).save();
} else {
  await wm.findOneAndUpdate({}, { $set:{lst:res} });
}
    }
}).catch((error)=>{      console.log(error);
});
}

setInterval(() => {
    main()
}, 1000);