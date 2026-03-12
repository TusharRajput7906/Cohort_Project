import { Router } from "express";
import { createShortUrl , getUrl } from "../controllers/url.controller.js";

const authRouter = Router();

authRouter.post("/url",createShortUrl);

authRouter.get("/:shortId",getUrl)

export default authRouter;