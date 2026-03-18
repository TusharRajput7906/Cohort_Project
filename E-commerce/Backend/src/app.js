import express from "express";
import authRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/user",authRouter);


export default app;