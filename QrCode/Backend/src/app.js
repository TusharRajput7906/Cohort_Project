import express from "express";
import router from "./routes/qr.route.js";
import cors from "cors";

const app = express();

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", router);

export default app;