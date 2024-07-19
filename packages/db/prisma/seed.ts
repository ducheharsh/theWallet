import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function seed() {
const harsh = await prisma.user.upsert({
    where: {
        number: "1111111111"
    },
    update: {},
    create: {
        number: "1111111111",
        password: await bcrypt.hash("harsh", 10),
        name: "harsh",
        Balance:{
            create:{
                amount: 40000,
                locked: 0
            }
        },
        onRampTransaction:{
            create:{
                startTime: new Date(),
                token:"token__1",
                status:"Success",
                amount: 20000,
                provider: "HDFC Bank"
            },
        },

    }   
})

const archit = await prisma.user.upsert({
    where: {
        number: "2222222222"
    },
    update: {},
    create: {
        number: "2222222222",
        password: await bcrypt.hash("archit", 10),
        name: "archit",
        Balance:{
            create:{
                amount: 40000,
                locked: 0
            }
        },
        onRampTransaction:{
            create:{
                startTime: new Date(),
                token:"token__2",
                status:"Failure",
                amount: 20000,
                provider: "HDFC Bank"
            }
        }
    }

})
console.log({harsh, archit});
}
seed().catch(console.error).finally(()=>prisma.$disconnect());