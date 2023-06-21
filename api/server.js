import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import session from "express-session";

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.listen(8100, () => {
  console.log("API working!");
});
