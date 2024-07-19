
import axios from 'axios';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const app = express();
var cors = require('cors')
app.use(express.json());
app.use(cors())
app.post("/api/v1/hdfc/transfer", async(req, res) => {

    const token = uuidv4();
    console.log(token);
    console.log(req.body);
    // webhook request
    try{
    const transferStatusChange = await axios.post("http://localhost:3300/hdfcwebhook", {
        token:req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    })

    if(transferStatusChange.status === 200){
        res.status(200).json({
            message: "Transfer Completed"
        })
    }
    else{
        res.status(411).json({
            message: "Error while processing transfer"
        })
    }
}catch(e){
    console.error(e);
    res.status(411).json({
        message: "Error while processing transfer"
    })
}
})

app.listen(3301, ()=>{
    console.log("Server started at 3301");
})