const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;
const THREAD_COUNT = 4;

app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking");
});

function createWorker() {


    return new Promise(function (resolve, reject) {
        const worker = new Worker("./four-worker.js", {
            workerData: { thread_count: THREAD_COUNT },
        });


        worker.on("message", (data) => {
            resolve(data);
        });
        worker.on("error", (msg) => {
            reject(`An error ocurred: ${msg}`);
        });
    });
}

app.get("/blocking", async (req, res) => {
    // function in app.get("/blocking") to spawn new threads.
    const workerPromises = [];

    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
        //   create a new thread. You then push the promise object that the function returns into the workerPromises array
        // When the loop finishes, the workerPromises will have four promise objects each returned from calling the createWorker() function four times.

    }


    const thread_results = await Promise.all(workerPromises);
    // this will wait for all promises until it return 


    const total =
        thread_results[0] +
        thread_results[1] +
        thread_results[2] +
        thread_results[3];

    res.status(200).send(`result from 4 Thread ${total}`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// time curl --get http://localhost:3000/blocking