"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "@repo/ui/button"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { useState } from "react"
import { CreateP2PTransaction } from "../app/lib/actions/P2pTxnsAction"

export default function P2pTransfer() {
    const [amount, setAmount] = useState(0)
    const [peerPhn, setPeerPhn] = useState("")
   return( <Card className='mt-6 w-[30vw] h-fit'>
    <CardHeader>
        <CardTitle>Send amount</CardTitle>
      </CardHeader>
        <CardContent>

        <div className='flex flex-col ' >
            <h1>Phone No.</h1>
            <Input type='number' onChange={(e)=>{
                setPeerPhn(e.target.value)
            }} placeholder='Peers phone no. ' />
            <div className="mt-3">
            <h1 >Amount</h1>
            <Input type='number' onChange={(e)=>{
                setAmount(Number(e.target.value))
            }} placeholder='Enter Amount' />
            </div>
        </div>

        <div className='flex flex-col mt-6' >

<div className="mt-6">
        <Button onClick={async()=>{ 
            const sendMoney = await CreateP2PTransaction({amount, peerPhone:peerPhn})
            alert(sendMoney?.message)
            }}>
        Send Money
        </Button>
        </div>
  </div>

        </CardContent>
    </Card>
   )
}