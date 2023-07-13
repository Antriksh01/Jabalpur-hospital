// token verification

import { db } from "../connect.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const verifyUser = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.SECRETKEY);
    next();
  } catch (error) {
    console.log(error);
  }
};

// export const isAdmin = async (req, res) => {
//   const loginCredential = req.body.loginCredential;

//   const q = "SELECT * FROM admin_register WHERE username = ?";

//   db.query(q, [loginCredential], (error, results) => {
//     var string = res.send(JSON.stringify(results));
//     console.log(string);
//     if (string[0].role !== "Admin") {
//       return res
//         .status(401)
//         .send({ success: false, msg: "unauthorize access" });
//     } else {
//       next();
//     }
//   });
// };

// export const isDoctor = async (req, res) => {
//   const loginCredential = req.body.loginCredential;

//   const q = "SELECT * FROM admin_register WHERE username = ?";

//   db.query(q, [loginCredential], (error, results) => {
//     var string = res.send(JSON.stringify(results));
//     console.log(string);
//     if (string[0].role !== "Doctor") {
//       return res
//         .status(401)
//         .send({ success: false, msg: "unauthorize access" });
//     } else {
//       next();
//     }
//   });
// };

// export const isReception = async (req, res) => {
//   const loginCredential = req.body.loginCredential;

//   const q = "SELECT * FROM admin_register WHERE username = ?";

//   db.query(q, [loginCredential], (error, results) => {
//     var string = res.send(JSON.stringify(results));
//     console.log(string);
//     if (string[0].role !== "Receptionist") {
//       return res
//         .status(401)
//         .send({ success: false, msg: "unauthorize access" });
//     } else {
//       next();
//     }
//   });
// };
