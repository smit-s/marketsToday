// main app

const express = require("express");
const app = express();
const workerFarm = require('worker-farm')
const service = workerFarm(require.resolve('./angeldata'))
const service2 = workerFarm(require.resolve('./scrapper'))

service('', function (err, output) {
  console.log(err)
});


service2('', function (err, output) {
    console.log(err)
  })

  app.get("/", (req, res) => {
    res.send("Markets Today");
  });

  
  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`listening ${port}`);
  });