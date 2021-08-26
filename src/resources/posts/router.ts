import { Router } from "express"
import { createPost, getAllPosts } from "./controller"

const router = Router()

router.get("/", getAllPosts)

router.post("/", createPost)

export default router
