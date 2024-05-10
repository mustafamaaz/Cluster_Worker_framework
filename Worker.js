const { parentPort } = require("worker_threads");
// worker_threads module and extracts the parentPort class. The class provides methods you can use to send messages to the main thread. Next,
let counter = 0;
for (let i = 0; i < 20_000_000_000; i++) {
  counter++;
}

parentPort.postMessage(counter);