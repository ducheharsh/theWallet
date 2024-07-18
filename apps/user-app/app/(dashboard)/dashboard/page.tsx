import { getServerSession } from 'next-auth'
import localFont from 'next/font/local'
import { authOptions } from '../../lib/auth'
import {ChartComp} from '../../../components/HomeChart'

const myFont = localFont({ src: '../sb.ttf' })
export default async function() {
    const session = await getServerSession(authOptions)
    console.log(session)
    return(<div>
    <div className={`${myFont.className} capitalize  text-4xl mt-16 text-purple-600`}>
        Good Morninig, {session.user.name}
        
    </div>
    <div className='mt-6  '>
        <ChartComp/>
    </div>
    
    </div>
    )
} 