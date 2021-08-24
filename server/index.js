const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
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
const dax = mongoose.model(
  "dax",
  new mongoose.Schema({}, { collection: "dax" })
);
const ftse = mongoose.model(
  "ftse",
  new mongoose.Schema({}, { collection: "ftse" })
);
const ssec = mongoose.model(
  "ssec",
  new mongoose.Schema({}, { collection: "ssec" })
);
const nikkei = mongoose.model(
  "nikkei",
  new mongoose.Schema({}, { collection: "nikkei" })
);
const heng = mongoose.model(
  "heng",
  new mongoose.Schema({}, { collection: "heng" })
);
const sgx = mongoose.model(
  "sgx",
  new mongoose.Schema({}, { collection: "sgx" })
);
const dji = mongoose.model(
  "dji",
  new mongoose.Schema({}, { collection: "dji" })
);
const nasdaq = mongoose.model(
  "nasdaq",
  new mongoose.Schema({}, { collection: "nasdaq" })
);
const di = mongoose.model("di", new mongoose.Schema({}, { collection: "di" }));
const djif = mongoose.model(
  "djif",
  new mongoose.Schema({}, { collection: "djif" })
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening ${port}`);
});
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

    const dx = await dax.find();
    const ft = await ftse.find();
    const dj = await dji.find();
    const djf = await djif.find();
    const sg = await sgx.find();
    const se = await ssec.find();
    const ni = await nikkei.find();
    const hen = await heng.find();
    const nas = await nasdaq.find();
    const dli = await di.find();
    let dxobj = JSON.stringify(dx[0]);
    let ftobj = JSON.stringify(ft[0]);
    dxobj = JSON.parse(dxobj);
    ftobj = JSON.parse(ftobj);
    let djobj = JSON.stringify(dj[0]);
    let djfobj = JSON.stringify(djf[0]);
    djobj = JSON.parse(djobj);
    djfobj = JSON.parse(djfobj);
    let sgobj = JSON.stringify(sg[0]);
    let seobj = JSON.stringify(se[0]);
    sgobj = JSON.parse(sgobj);
    seobj = JSON.parse(seobj);
    let niobj = JSON.stringify(ni[0]);
    let henobj = JSON.stringify(hen[0]);
    niobj = JSON.parse(niobj);
    henobj = JSON.parse(henobj);
    let nasobj = JSON.stringify(nas[0]);
    let dliobj = JSON.stringify(dli[0]);
    nasobj = JSON.parse(nasobj);
    dliobj = JSON.parse(dliobj);

    return [
      nftyObj,
      bnknftyObj,
      dxobj,
      ftobj,
      djobj,
      djfobj,
      sgobj,
      seobj,
      niobj,
      henobj,
      nasobj,
      dliobj,
    ];
  } catch (err) {
    console.log(err);
  }
}
