import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
async function main() {
    const tasks = [
        "牛乳を買いに行く",
        "牛乳を買いに飲む",
        "牛乳を買いに捨てる",
    ]

    await Promise.all(tasks.map((task)=> {
        return prisma.task.create({
            data: {
                title:task
            }
        })
    }))
}

main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
})
