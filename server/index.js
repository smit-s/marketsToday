const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios=require('axios');
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
trigger()();
setInterval(trigger(), 1750000);

mongoose
  .connect(
    "mongodb+srv://admin:admin@index.yscf1.mongodb.net/index?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    return new Error("Connection failed: ");
  });

const nfty = mongoose.model(
  "nifty",
  new mongoose.Schema({}, { collection: "nifty" })
);
const bnknfty = mongoose.model(
  "bank_nifty",
  new mongoose.Schema({}, { collection: "bank_nifty" })
);
const wm = mongoose.model(
  "wm",
  new mongoose.Schema({}, { collection: "wm" })
);
const analysisModel = mongoose.model(
  "stockList",
  new mongoose.Schema({}, { collection: "stockList" })
);
app.get("/", (req, res) => {
  res.send("Markets Today");
});
app.get("/indices", (req, res) => {
  const ans = getIndexData();
  ans.then((data) => {
    res.send(JSON.stringify(data));
  });
});

app.get("/analysis", (req, res) => {
  const ans  = getstockList();
  ans.then((data) => {
    res.send(JSON.stringify(data));
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening ${port}`);
});
function trigger() {
  return () => {
    axios.get('https://fetcherz.herokuapp.com/').then((res) => {
      console.log(res.data);
    });
  };
}

async function getstockList() {
  try {
    const lst = await analysisModel.find();
    let stockListObj = JSON.stringify(lst);
    stockListObj = JSON.parse(stockListObj);
    let stockNameList=stockListObj.map((res)=>res['name'])
    return stockNameList;
  }catch (err) {
    console.log(err);
  }
}

async function getIndexData() {
  try {
    const nf = await nfty.find();
    const bnf = await bnknfty.find();
    let nftyObj = JSON.stringify(nf[0]);
    let bnknftyObj = JSON.stringify(bnf[0]);
    nftyObj = JSON.parse(nftyObj);
    bnknftyObj = JSON.parse(bnknftyObj);
    nftyObj["index_name"] = "nifty";
    bnknftyObj["index_name"] = "bank nifty";

    const wldmkts = await wm.find();
    let wmobj = JSON.stringify(wldmkts[0]);   
    wmobj = JSON.parse(wmobj);
    return [
      nftyObj,
      bnknftyObj,
      ...wmobj['lst']
    ];
  } catch (err) {
    console.log(err);
  }
}
