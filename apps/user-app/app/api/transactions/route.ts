import { getServerSession } from "next-auth"
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export const POST = async (req:NextRequest, res:NextResponse) => {
    const session = await getServerSession(authOptions);
    const data = await req.json();
    if (!session.user) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 403
        })
    }
    
    const transaction = await prisma.onRampTransaction.create({
        data: {
            userId: Number(session.user.id),
            startTime: new Date(),
            token: data.token,
            status:"Processing",
            amount: data.amount,
            provider: "HDFC Bank"
        }
    })
    return NextResponse.json({
        message: "Transaction initiated",
        transaction
    })
}