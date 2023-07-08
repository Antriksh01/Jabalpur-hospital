import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import session from "express-session";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("hello backend");
});

app.listen(port, () => {
  console.log("API working!");
});
