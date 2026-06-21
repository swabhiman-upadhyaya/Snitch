import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import router from "./routes/auth.route.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running"
  })
})

app.use("/api/auth", authRouter);

export default app