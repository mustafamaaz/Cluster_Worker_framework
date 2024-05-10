// Creating a CPU-Bound Task Without Worker Threads


const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {

  let counter = 0;
  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }
  
  res.status(200).send(`result is ${counter}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


// first you visit /blocking then other pages will not gives instance response
// after executing /blocking then other all pages will be blocked because of singal thread 
// main thread is blocked, Node.js cannot serve any requests until the CPU-bound task has finished. 