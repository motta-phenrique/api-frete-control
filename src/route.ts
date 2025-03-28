import { Router } from "express"
import { UserController } from "./controllers/UserController"
import { FreightController } from "./controllers/FreightController"
import { ExpensesController } from "./controllers/ExpensesController"

export const router = Router()
const userController = new UserController()
const freightController = new FreightController()
const expensesController = new ExpensesController()


// User Routers
router.post("/auth/create-user", userController.createUser)
router.post("/auth/login", userController.loginUser)

// Freight Routers
router.get("/freight/get-freight", freightController.getFreights)
router.get("/freight/get-one-freight", freightController.getOneFreight)

router.post("/freight/create", freightController.createFreight)
router.post("/freight/delete", freightController.deleteFreight)

router.patch("/freight/update", freightController.updateOneFreight)
router.patch("/freight/update-status", freightController.updateFreightStatus)

// Expenses Routers
router.post("/expenses/create", expensesController.createExpenses)
router.delete("/expenses/delete", expensesController.deleteExpenses)
