import express from "express";
import { generateQR } from "../controllers/qr.controller.js";

const router = express.Router();

router.post("/generate-qr",generateQR);

export default router;