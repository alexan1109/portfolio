import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

      const project = await prisma.projects.create({
        data: {
          id: '2',
          title: "Project 2",
          company: "Company 2",
          description: "Description of project",
          website: "alicejenning.cloud",
          userId: "1",
          email: "alicejen@gmail.com",
          createdAt: new Date("2024-10-05"),

        },
      })
      console.log(project)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })