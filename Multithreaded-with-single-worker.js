// Offloading a CPU-Bound Task with the worker-threads Module

const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {

    //   This creates a new thread and the code in the worker.js file starts running in the thread on another core.
    const worker = new Worker("./Worker.js");


    // on("message") method to listen to the message event. When the message is received containing the result from the worker.js file,
    //  it is passed as a parameter to the method’s callback, which returns a response

    worker.on("message", (data) => {
        res.status(200).send(`result is ${data}`);
    });


    worker.on("error", (msg) => {
        res.status(404).send(`An error occurred: ${msg}`);
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});