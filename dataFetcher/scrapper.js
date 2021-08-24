const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@index.yscf1.mongodb.net/index?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) .then(() => {
    console.log("connected");
  }) .catch(() => {
    return new Error("Coonection failed: ");
  });
const indexSchema = new mongoose.Schema({
  index_name: String,
  nc: String,
  cng: String,
  ltp: String,
});
const dax = mongoose.model("dax", indexSchema, "dax");
const ftse = mongoose.model("ftse", indexSchema, "ftse");
const ssec = mongoose.model("ssec", indexSchema, "ssec");
const nikkei = mongoose.model("nikkei", indexSchema, "nikkei");
const heng = mongoose.model("heng", indexSchema, "heng");
const sgx = mongoose.model("sgx", indexSchema, "sgx");
const dji = mongoose.model("dji", indexSchema, "dji");
const nasdaq = mongoose.model("nasdaq", indexSchema, "nasdaq");
const di = mongoose.model("di", indexSchema, "di");
const djif = mongoose.model("djif", indexSchema, "djif");

const indexList=['germany-30','uk-100','shanghai-composite','japan-ni225','hang-sen-40','india-50-futures','us-30','nasdaq-composite','us-30-futures']
const dindex=['us-dollar-index'];
res=[];
promises=[];

function getDetails(response, index) {
    const $ = cheerio.load(response.data);
    obj = {
        ltp: $(".last-price-value").text(),
        cng: $(".last-diff-value").text(),
        nc: $(".last-diff-percent").text(),
        index_name: `${index}`
    };
    res.push(obj);
}
async function updateTick(data, tokenId, mdl) {
    indexObj = data.filter((obj) => obj["index_name"] === tokenId);
    if (indexObj != null && indexObj != undefined && indexObj.length > 0) {
        const obj=indexObj[0];
      if ((await mdl.find().count()) == 0) {
        await new mdl(obj).save();
      } else {
        await mdl.findOneAndUpdate({ index_name: tokenId }, { $set: obj });
      }
    }
  }
  cnt=0;
function main( ){
dindex.forEach(index => {
    promises.push(  axios.get(`https://in.investing.com/currencies/${index}`).then((response) => {
      getDetails(response, index);
    })
    .catch((error) => {
    }));
});

indexList.forEach(index => {
    promises.push(  axios.get(`https://in.investing.com/indices/${index}`).then((response) => {
      getDetails(response, index);
    })
    .catch((error) => {
    }));
});
Promise.all(promises).then(()=>{
    updateTick(res,'germany-30',dax);
    updateTick(res,'uk-100',ftse);
    updateTick(res,'shanghai-composite',ssec);
    updateTick(res,'japan-ni225',nikkei);
    updateTick(res,'hang-sen-40',heng);
    updateTick(res,'india-50-futures',sgx);
    updateTick(res,'us-30',dji);
    updateTick(res,'nasdaq-composite',nasdaq);
    updateTick(res,'us-dollar-index',di);
    updateTick(res,'us-30-futures',djif);
    console.log(cnt)
    cnt+=1;
    res=[]
    promises=[]
})
}

setInterval(() => {
    main()
}, 5000);