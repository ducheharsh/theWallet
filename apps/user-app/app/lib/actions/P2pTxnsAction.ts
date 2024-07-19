"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export async function CreateP2PTransaction({peerPhone, amount}:{peerPhone:string, amount:number}) {
    const session = await getServerSession(authOptions);
    const userId = Number(session.user?.id)

    if (!userId) {
        throw new Error("User not logged in");
    }

try{   
await db.$transaction([

    db.balance.updateMany({
        where:{
            userId
        },
        data:{
            amount:{
                decrement:amount
            }
        }
    }),

    db.balance.updateMany({
            where:{
                user:{
                    number: peerPhone
                }
            },
            data:{
                amount: {
                    increment:amount
                }
            }
        
    })
])
return {
    message:"Transfered"
}

 }
 catch(e){
    console.log(e)
    return {
        message:"Unsuccessful",
    }
    
 }


}