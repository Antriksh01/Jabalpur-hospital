const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.js");
const session = require("express-session");
const twilio = require("twilio");
const dotenv = require("dotenv");
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
