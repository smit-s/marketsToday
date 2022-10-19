let { SmartAPI } = require("smartapi-javascript");
let  WebSocket  = require("./websocket");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://admin:admin@index.yscf1.mongodb.net/index?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    return new Error("Coonection failed: ");
  });
const indexSchema = new mongoose.Schema({
  name: String,
  tk: String,
  e: String,
  c: String,
  nc: String,
  cng: String,
  ltp: String,
});
const nfty = mongoose.model("nifty", indexSchema, "nifty");
const bnknfty = mongoose.model("bank_nifty", indexSchema, "bank_nifty");
async function getSocket() {
  var data = JSON.stringify({
    clientcode: "",
    password: "",
  });
  let smart_api = new SmartAPI({
    api_key: "", // PROVIDE YOUR API KEY HERE
  });

  const session = await smart_api.generateSession("", "");
  const feed_token = session["data"]["feedToken"];
  const jwt = session["data"]["jwtToken"];
  const socket = new WebSocket({
    client_code: "",
    feed_token: feed_token,
  });
  await socket.connect();
  return socket;
}
async function receiveTick(data) {
  try {
    if (data.length > 0) {
      await updateTick(data, '26000', nfty);
      await updateTick(data, '26009', bnknfty);
    }
  } catch {
    //console.log("error");
  }
  console.log("receiveTick:::::", data);
}

function runFeed(){
const socket = getSocket();
socket.then((socket) => {
  socket.runScript("nse_cm|26000&nse_cm|26009", "mw");
  socket.on("tick", receiveTick);
  socket.on("close", runFeed);
}).catch((err)=>{console.log(err)});
}

async function updateTick(data, tokenId, mdl) {
  indexObj = data.filter((obj) => obj["tk"] === tokenId);
  if (indexObj != null && indexObj != undefined && indexObj.length > 0) {
      const obj=indexObj[0];
    if ((await mdl.find().count()) == 0) {
      await new mdl(obj).save();
    } else {
      await mdl.findOneAndUpdate({ tk: tokenId }, { $set: obj });
    }
  }
}

runFeed();
