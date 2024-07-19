import express from 'express';
import db from "@repo/db/client";

var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

app.post("/hdfcwebhook", async(req, res)=>{

    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
    }
    console.log(paymentInformation.userId)
    try{
    await db.$transaction([
        db.balance.updateMany({
        where:{
            userId: Number(paymentInformation.userId)
        },
        data:{
            amount: {
                increment: paymentInformation.amount
            }
        }
    }),
        db.onRampTransaction.updateMany({
        where:{
            token: paymentInformation.token
        },
        data:{
            status: "Success"
        }
        }
    )
    ]);
    res.status(200).json({
        message: "Captured"
    })
}catch(e){
    console.error(e);
    res.status(411).json({
        message: "Error while processing webhook"
    })
}
})

app.listen(3300, ()=>{
    console.log("Server started at 3300");
})