import { Router } from "express"
import { UserController } from "./controllers/UserController"
export const router = Router()

const userController = new UserController()

router.post("/auth/create-user", userController.createUser)
router.post("/auth/login", userController.loginUser)