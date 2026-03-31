import { Router } from "express";
const orderRouter = Router();
import { createOrderController,getOrderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";


orderRouter.post("/",authMiddleware,createOrderController);
orderRouter.get("/",authMiddleware,getOrderController);

export default orderRouter;