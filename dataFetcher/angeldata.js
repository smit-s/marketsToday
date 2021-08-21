let { SmartAPI, WebSocketClient, WebSocket } = require("smartapi-javascript");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/index", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
  ic: Number,
  nc: Number,
  cng: Number,
  iv: Number,
  tvalue: String,
  ihv: Number,
  ilv: Number,
  iov: Number,
});
const nfty = mongoose.model("nifty", indexSchema, "nifty");
const bnknfty = mongoose.model("bank_nifty", indexSchema, "bank_nifty");
async function getSocket() {
  var data = JSON.stringify({
    clientcode: "S859046",
    password: "Smit@1998",
  });
  let smart_api = new SmartAPI({
    api_key: "cMUf87gC", // PROVIDE YOUR API KEY HERE
  });

  const session = await smart_api.generateSession("S859046", "Smit@1998");
  const feed_token = session["data"]["feedToken"];
  const jwt = session["data"]["jwtToken"];
  const socket = new WebSocket({
    client_code: "S859046",
    feed_token: feed_token,
  });
  await socket.connect();
  return socket;
}
async function receiveTick(data) {
  try {
    if (data.length > 0) {
      await updateTick(data, 26000, nfty);
      await updateTick(data, 26009, bnknfty);
    }
  } catch {
    console.log("error");
  }
  console.log("receiveTick:::::", data);
}

const socket = getSocket();
socket.then((socket) => {
  socket.runScript("nse_cm|26000&nse_cm|26009", "mw");
  socket.on("tick", receiveTick);
});

async function updateTick(data, tokenId, mdl) {
  indexObj = data.filter((obj) => obj["tk"] === tokenId);
  if (indexObj != null && indexObj != undefined && indexObj.length > 0) {
    if ((await mdl.find().count()) == 0) {
      await new mdl(niftyObj).save();
    } else {
      await mdl.findOneAndUpdate({ tk: tokenId }, { $set: { indexObj } });
    }
  }
}
