import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

// import {config} from "dotenv"
// config()

const SECRET = process.env.SECRET as string // 'cast' instead of 'type' because we are certain
console.log("secret:", SECRET)

export function createToken(payload: jwt.JwtPayload) {
  return jwt.sign(payload, SECRET)
}

export function validateToken(token: string) {
  return jwt.verify(token, SECRET)
}
