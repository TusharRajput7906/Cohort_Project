const express= require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const taskRouter = require("./routes/task.route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;