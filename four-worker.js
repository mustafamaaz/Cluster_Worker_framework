const { workerData, parentPort } = require("worker_threads");
// data is send through object
let counter = 0;
for (let i = 0; i < 20_000_000_000 / workerData.thread_count; i++) {
  counter++;
}
console.log("four worker js file run");
parentPort.postMessage(counter);