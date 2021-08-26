// import dbClient from "../../utils/database"
import { Request, Response } from "express"
import userClient from "./service"

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await userClient.findMany()
  res.json({ data: allUsers })
}

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body
  const savedUser = await userClient.create(newUser)

  res.json({ data: savedUser })
}
