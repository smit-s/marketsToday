const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://admin:admin@index.yscf1.mongodb.net/index?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    return new Error("Coonection failed: ");
  });

const nfty = mongoose.model(
  "nifty",
  new mongoose.Schema({}, { collection: "nifty" })
);
const bnknfty = mongoose.model(
  "bank_nifty",
  new mongoose.Schema({}, { collection: "bank_nifty" })
);

app.get("/indices", (req, res) => {
const ans=getIndexData();
ans.then((data)=>{res.set('Access-Control-Allow-Origin','*');res.end(JSON.stringify(data))});
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening ${port}`);
});
async function getIndexData() {
    const nf = await nfty.find();

    const bnf = await bnknfty.find();
    let nftyObj = JSON.stringify(nf[0]);
    let bnknftyObj = JSON.stringify(bnf[0]);
     nftyObj = JSON.parse(nftyObj);
     bnknftyObj = JSON.parse(bnknftyObj);
    nftyObj["index_name"] = "nifty";
    bnknftyObj["index_name"] = "bank nifty";
    return [nftyObj, bnknftyObj];
}

