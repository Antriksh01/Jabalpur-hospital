import express from "express";
const app = express();
import cors from "cors";
import authRoutes from "./routes/auth.js";

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.listen(8100, () => {
  console.log("API working!");
});
