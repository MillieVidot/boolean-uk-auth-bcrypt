import { Router } from "express"
import { loginUser } from "./controller"

const authRouter = Router()

// log in

authRouter.route("/login").post(loginUser)

//log out

export default authRouter
