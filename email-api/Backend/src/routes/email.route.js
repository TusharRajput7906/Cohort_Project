import { Router } from "express";
import { sendEmail } from "../controllers/email.controller.js";
const emailRouter = Router();

emailRouter.post("/email",sendEmail);

export default emailRouter;