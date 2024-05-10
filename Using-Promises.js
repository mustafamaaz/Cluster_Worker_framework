// Offloading a CPU-Bound Task Using Promises
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

function calculateCount() {
  return new Promise((resolve, reject) => {
    let counter = 0;
    for (let i = 0; i < 20_000_000_000; i++) {
      counter++;
    }
    resolve(counter);
  });
}

app.get("/blocking", async (req, res) => {
  const counter = await calculateCount();
  res.status(200).send(`result is ${counter}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


// visit http://localhost:3000/blocking and as it loads, quickly reload the http://localhost:3000/non-blocking tabs. 
// As you will notice, the non-blocking routes are still affected and they will all wait for the /blocking route to finish loading. 
// Because the routes are still affected, promises don’t make JavaScript code execute in parallel and cannot be used to make CPU-bound tasks non-blocking.