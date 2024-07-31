

import localFont from 'next/font/local'

import BalanceCard from '../../../components/BalanceCard'
import OnRampTransCard from '../../../components/OnRampTrans'
import prisma from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import AddMoney from '../../../components/AddMoney'
const myFont = localFont({ src: '../sb.ttf' })

 async function getBalance(){
    const session = await getServerSession(authOptions)
    const balance = await prisma.balance.findFirst({
        where:{
            userId:Number(session.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions(){
    const session = await getServerSession(authOptions)
    const transactions = await prisma.onRampTransaction.findMany({
        where:{
            userId: Number(session.user?.id)
        }
    });
    return transactions.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))                    
}


export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions()
    return( 
    <div>
    <div className={`${myFont.className} text-4xl mt-16  text-purple-600`}>
    Transfer
    </div>
    <div className='flex'>
        <AddMoney/>
    <div>
    <BalanceCard amount={balance.amount} lockedAmount={balance.locked} />
    <OnRampTransCard transactions={transactions} />
    </div>
    </div>

</div>
)
}