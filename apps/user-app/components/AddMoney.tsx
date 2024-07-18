"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "@repo/ui/button"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { useState } from "react"
import axios from "axios"

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export default function AddMoney() {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
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
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
<div className="mt-6">
            <Button onClick={() => {
                axios.post("/api/transactions", {
                    amount: amount,
                    token:"token__13"
                }).then((res) => {
                    console.log(res.data)
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