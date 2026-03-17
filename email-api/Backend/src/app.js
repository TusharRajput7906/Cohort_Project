import express from "express";
import emailRouter from "./routes/email.route.js";

const app = express();
app.use(express.json());

app.use("/api",emailRouter);

export default app;