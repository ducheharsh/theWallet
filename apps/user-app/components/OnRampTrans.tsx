import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "./ui/card";

enum TransactionType {
    Deposit = 'Deposit',
    Withdrawal = 'Withdrawal',
    Transfer = 'Transfer',

}
enum OnRampStatus {
    Success,
    Failure,
    Processing
  }

export default function OnRampTransCard({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: OnRampStatus,
        provider: string
    }[]
}) {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return( 
    
        <Card className='mt-3 w-[35vw] ml-12'>
        <CardHeader >
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription className='pb-3 border-b border-slate-300'></CardDescription>
          </CardHeader>
            <CardContent>
            <div className="">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                        
                        {t.status}
                    </div>

                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
       
            </CardContent>
        </Card>
    )
}