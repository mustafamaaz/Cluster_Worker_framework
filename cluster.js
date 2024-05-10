const cluster = require('node:cluster');
const express = require("express")
const os = require('os')
const numCPUs = os.cpus().length;
const process = require('node:process');




// console.log("number of cpus , ", numCPUs);

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        // console.log("before fork");
        cluster.fork();
        // console.log("after fork");

    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {

    const app = express()
    const PORT = 8000;


    app.get("/", (req, res) => {
        return res.json({ Message: `This is from express server having PID is : ${process.pid} ` })
    });


    console.log(`Worker ${process.pid} started`);

    app.listen(PORT , ()=>{ console.log(`Server start at port : ${PORT}`);  })
}


// So, the statement means that while worker threads are useful for CPU-intensive tasks, such as heavy computations or data processing,
//  they are not the most efficient choice for I/O-intensive operations. Node.js's built-in asynchronous I/O mechanisms are generally more suitable and efficient for handling I/O operations, 
//  as they allow the main thread to continue processing other tasks while waiting for I/O operations to complete.

// https://www.geeksforgeeks.org/differentiate-between-worker-threads-and-clusters-in-node-js/    resources  