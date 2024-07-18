import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { CardHeader } from "./ui/card";

interface BalanceCardProps {
    amount: number,
    lockedAmount: number,
}
export default function BalanceCard({amount, lockedAmount}: BalanceCardProps) {
    return(
        <Card className='mt-6 ml-12 w-[35vw] h-fit'>
    <CardHeader>
        <CardTitle>Balances</CardTitle>
        <CardDescription className='pb-3 border-b border-slate-300'>January - June 2024</CardDescription>
      </CardHeader>
        <CardContent>
        <div className='p-2'>
        <div className='flex justify-between pb-2 text-green-600'>
            <div className='flex '>Unlocked Balance<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
                </div>
            <div className=''>{amount}</div>
        </div>
        <div className='flex justify-between pt-2 pb-2 border-b text-red-600 border-slate-300'>
            <div className='flex '>Total Locked Balance<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

                </div>
            <div className=''>{lockedAmount}</div>
        </div>
        <div className='flex justify-between pb-2 pt-2  '>
            <div className='flex'>Total Balance
                </div>
            <div className=''>{amount-lockedAmount}</div>
        </div>
        </div>
        </CardContent>
    </Card>
    )
}