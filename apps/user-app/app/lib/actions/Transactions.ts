"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransactions({amount, provider}:{amount:number, provider:string}) {
    const session = await getServerSession(authOptions);
    const userId = session.user?.id;
    const token = Math.random().toString(36).substring(7);
    if (!userId) {
        throw new Error("User not logged in");
    }
    const transaction = await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            startTime: new Date(),
            token:token,
            status:"Processing",
            amount: amount * 100,
            provider:provider 
        }
    })
    return {
        message: "Transaction initiated",
        transaction
    };
}