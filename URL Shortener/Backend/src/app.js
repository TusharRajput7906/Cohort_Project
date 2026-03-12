import express from "express"
import authRouter from "./routes/url.route.js";

const app = express();

app.use(express.json());  // middleware

app.use("/api",authRouter);

export default app;