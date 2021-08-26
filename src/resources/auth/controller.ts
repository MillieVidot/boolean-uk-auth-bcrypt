import { User } from "@prisma/client"
import { Request, Response } from "express"
import findUserWithValidation from "./service"
import { createToken } from "../../utils/authGenerator"

export const loginUser = async (req: Request, res: Response) => {
  const userCreds: User = req.body
  try {
    const loggedUser = await findUserWithValidation(userCreds)

    const token = createToken({
      id: loggedUser.id,
      username: loggedUser.username,
    })
    console.log("token:", token)
    res.cookie("token", token, { httpOnly: true }) //creates cookie and stops browser acess to cookie (options)
    // use {credentials: "include"} in every fetch 2nd arg (options) for httpOnly cookie.

    res.json({ user: { username: loggedUser.username } }) //sending info to front end
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}
