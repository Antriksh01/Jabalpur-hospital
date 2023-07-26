const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.js");
const session = require("express-session");
const twilio = require("twilio");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
require("./Sync.js");
require("./Sync_one.js");

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

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log("API working!");
});
