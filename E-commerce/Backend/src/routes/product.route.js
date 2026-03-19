import express from "express";
import { productCreateController,getAllProductController, deleteProductController,updateProductController } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
const productRouter = express.Router();

productRouter.post("/created",authMiddleware,productCreateController);
productRouter.get("/get",authMiddleware,getAllProductController);
productRouter.delete("/delete/:id",authMiddleware,deleteProductController);
productRouter.patch("/update/:id",authMiddleware,updateProductController);

export default productRouter;