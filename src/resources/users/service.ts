import dbClient from "../../utils/database"
import { User, Role } from "@prisma/client"
import { hash } from "bcrypt"

export type NewUser = {
  username: string
  password: string
  bio?: string
  role: Role | undefined
}

export const create = async (newUser: User) => {
  const plaintext = newUser.password
  const hashedPassword = await hash(plaintext, 10)

  const savedUser = await dbClient.user.create({
    data: { ...newUser, password: hashedPassword },
  })
  return savedUser
}

const userClient = { ...dbClient.user, create }

export default userClient
// new create function replaces old create.
// Includes dbClient so all methods too.
