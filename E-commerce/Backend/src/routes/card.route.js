import {Router} from "express";
import { addToCartController,getCartController ,removeCartItemController} from "../controllers/card.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
const cardRouter = Router();

cardRouter.post("/",authMiddleware,addToCartController);
cardRouter.get("/",authMiddleware,getCartController);
cardRouter.delete("/:id",authMiddleware,removeCartItemController);

export default cardRouter;
