// token verification

const db = require("../connect");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const verifyUser = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.SECRETKEY);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyUser;
