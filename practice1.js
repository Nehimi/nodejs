//Setting route to be accessed by users to send data with post requests.

import express from "express";
const app = express();
app.use(express.json());
const port=process.env.PORT || 5000;

app.post('/',(req,res)=>{
const {name}=req.body;
res.status(200);
res.send(`Hello ${name}`);

})
app.listen(port,(error)=>{

    if(!error){
        console.log("Server running successfully and app is listening on port",port);
    }
    else{
        console.log("Server running failed",error);
    }
})