import express from "express"
import cors from "cors";
import authRouter from "./routes/url.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRouter);

export default app;