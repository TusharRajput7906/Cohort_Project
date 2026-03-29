import { Router } from "express";
const orderRouter = Router();
import { createOrderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
orderRouter.post("/",authMiddleware,createOrderController);

export default orderRouter;