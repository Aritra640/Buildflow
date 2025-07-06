import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AddUserParam {
  Username : string;
  Email    : string;
  Avatar   : string;
}

async function Adduser({Username, Email, Avatar} : AddUserParam) {

  await prisma.user.createMany({
    data: [
      {
        username: Username,
        email: Email,
        avatar_url: Avatar
      }
    ]
  });
}


async function AddUserHandler(req: express.Request , res: express.Response) { 
  
  const { username, email, avatar_url } = req.body;
  
  try {

    const user = prisma.user.create({
      data: {
        username,
        email,
        avatar_url
      }
    })
  }
}
