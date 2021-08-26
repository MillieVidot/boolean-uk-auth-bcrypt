import express from "express"
import usersRouter from "./resources/users/router"
import authRouter from "./resources/auth/router"
import { validateToken } from "./utils/authGenerator"
import cors from "cors"
import { JwtPayload } from "jsonwebtoken"

//globally patching the Request in the Express package with currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser: string | JwtPayload
    }
  }
}

const cookieParser = require("cookie-parser")
const logger = require("morgan")

const app = express()

// middlewares
app.use(logger("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:3001", credentials: true })) //url of front end

// app routes
app.use(authRouter)

app.use((req, res, next) => {
  const token = req.cookies.token
  console.log("cookie", req.cookies)
  const userData = validateToken(token) //returns object
  console.log("userData", userData)

  if (userData) {
    req.currentUser = userData // CREATES NEW PROPERTY in req
    next() //here
  } else {
    res.status(401).json({ err: "you need to be logged in mate" })
  }
}) // middleware. 'next()' continues route.

app.use("/users", usersRouter)

//routes
app.all("*", (req, res) => {
  res.status(404).json("No routes match!")
})

module.exports = app
