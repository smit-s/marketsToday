// main app
const workerFarm = require('worker-farm')
const service = workerFarm(require.resolve('./angeldata'))
const service2 = workerFarm(require.resolve('./scrapper'))

service('', function (err, output) {
  console.log(err)
});


service2('', function (err, output) {
    console.log(err)
  })