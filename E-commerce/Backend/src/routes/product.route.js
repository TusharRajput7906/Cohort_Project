import express from "express";
import { productCreateController,getAllProductController, deleteProductController,updateProductController } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import {createProductValidator,updateProductValidator} from "../validators/product.validator.js";
import { validate } from "../validators/validate.js";
const productRouter = express.Router();

productRouter.post("/created",authMiddleware,createProductValidator,validate,productCreateController);
productRouter.get("/get",authMiddleware,getAllProductController);
productRouter.delete("/delete/:id",authMiddleware,deleteProductController);
productRouter.patch("/update/:id",authMiddleware,updateProductController,validate,updateProductController);

export default productRouter;