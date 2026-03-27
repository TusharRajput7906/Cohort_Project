import express from "express";
import authRouter from "./routes/user.route.js";
import cardRouter from "./routes/card.route.js";
import productRouter from "./routes/product.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());


app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cardRouter);


export default app;