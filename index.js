const express = require("express")

const app = express()
const PORT = 8000;




app.get("/" , (req,res)=>{

    let x = 0 ;

    for( let i =0 ; i< 500000 ; i++ ){
             x= x+i
    }

    return res.json({Message : `This is from express server having PID is : ${process.pid} have value ${x} `})
});



app.listen(PORT , ()=>{ console.log(`Server start at port : ${PORT}`);  })

// npx loadtest -n  10000 -c 800 -k http://localhost:8000/