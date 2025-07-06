import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {

  const seedvar =  prisma.user.createMany({
    data: [
      {
        username: "Alex",
        email: "alex@gmail.com",
        avatar_url: "dummy_avatar"
      }, 
      {
        username: "Bob",
        email: "bob@gmail.com",
        avatar_url: "dummy_avatar"
      }
    ]
  });

  seedvar.then(() => prisma.$disconnect());
}

seed().then(() => {console.log("database seeded!")});


