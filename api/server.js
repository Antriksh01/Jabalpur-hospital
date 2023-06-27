import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import session from "express-session";
import twilio from "twilio";

// // twilio-setup
const accountSid = "AC497b7b2e364b9aa2b2260b30951b4986";
const authToken = "24059079c86f6942d7ddc2f799e5aa97";
const client = twilio("ACCOUNT_SID", "AUTH_TOKEN");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.listen(8100, () => {
  console.log("API working!");
});
