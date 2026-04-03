import { Router } from "express";
const orderRouter = Router();
import { createOrderController,getOrderController, getSingleOrderController, updateOrderStatusController, deleteOrderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";


orderRouter.post("/",authMiddleware,createOrderController);
orderRouter.get("/",authMiddleware,getOrderController);
orderRouter.get("/:id",authMiddleware,getSingleOrderController);
orderRouter.patch("/:id",updateOrderStatusController);
orderRouter.delete("/:id",deleteOrderController);

export default orderRouter;