import { Router } from "express"
import { UserController } from "./controllers/UserController"
import { FreightController } from "./controllers/FreightController"
import { ExpensesController } from "./controllers/ExpensesController"
import { authMiddleware } from "./middleware/middleware"
 
export const router = Router()
const userController = new UserController()
const freightController = new FreightController()
const expensesController = new ExpensesController()


// User Routers
router.post("/auth/create-user", userController.createUser)
router.post("/auth/login", userController.loginUser)
router.post("/auth/reset-password", userController.recoveryPassword)
router.post("/auth/verify-otp", userController.verifyOtp)
router.post("/auth/create-new-password", userController.createNewPassword)

// Freight Routers
router.get("/freight/get-freight",authMiddleware, freightController.getFreights)
router.get("/freight/get-one-freight", authMiddleware, freightController.getOneFreight)
router.get("/freight/get-freight-details", authMiddleware, freightController.getFreightDashboardDetails)

router.post("/freight/create", authMiddleware, freightController.createFreight)
router.post("/freight/delete",authMiddleware, freightController.deleteFreight)

router.patch("/freight/update",authMiddleware, freightController.updateOneFreight)
router.patch("/freight/update-status",authMiddleware, freightController.updateFreightStatus)

// Expenses Routers
router.post("/expenses/create", authMiddleware, expensesController.createExpenses)
router.delete("/expenses/delete",authMiddleware, expensesController.deleteExpenses)
