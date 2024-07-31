"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "@repo/ui/button"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { useState } from "react"
import axios from "axios"
import { createOnRampTransactions } from "../app/lib/actions/Transactions"
import { useSession } from "next-auth/react"


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export default function AddMoney() {
    const session = useSession();
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name)
    console.log()
    return(
        <Card className='mt-6 w-[35vw] h-fit'>
        <CardHeader>
            <CardTitle>Add amount</CardTitle>
            <CardDescription className='pb-3 border-b border-slate-300'>January - June 2024</CardDescription>
          </CardHeader>
            <CardContent>
    
            <div className='flex flex-col ' >
                <h1>Amount</h1>
                <Input type='number' onChange={(e)=>{
                    setAmount(Number(e.target.value))
                }} placeholder='Enter Amount' />
            </div>
            <div className='flex flex-col mt-6' >
         <Select onSelect={(value:any) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
<div className="mt-6">
            <Button onClick={async()=>{ 
                const res = await createOnRampTransactions({amount, provider: provider || ""}).then((res)=>{
                 axios.post("http://localhost:3301/api/v1/hdfc/transfer", {
                        amount,
                        userId:(session.data?.user as any)?.id, 
                        token:res.token
                    }).then((BankRequest)=>{
                        BankRequest.data.message === "Transfer Completed" ? alert("Money added successfully") : alert("Error while adding money")
                    })
                    
                })
               
                
                }}>
            Add Money
            </Button>
            </div>
      </div>

            </CardContent>
        </Card>
    )
}