import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mysql from "mysql";
import session from "express-session";

export const register = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM admin_register WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO admin_register (`username`,`mobile`,`reg_email`, `password`,`cpassword`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.mobile,
      req.body.reg_email,
      hashedPassword,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("User has been created.");
    });
  });
};

//forgot password
export const sendEmail = (req, res) => {
  const { reg_email, password, cpassword } = req.body;
  const q = "SELECT * FROM admin_register WHERE reg_email = ?";

  db.query(q, [req.body.reg_email], (err, data) => {
    if (err) return res.status(500).send(err);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = `UPDATE admin_register SET password = ? WHERE reg_email = ?`;

    db.query(q, [req.body.reg_email, req.body.hashedPassword], (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json("password updated successfull");
    });
  });
};

export const dataLogin = async (req, res) => {
  return res.json({ Status: "success", name: req.name });
  // console.log(res);
};

// login
export const login = async (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admin_register WHERE username = ?",
    [username],
    (err, result) => {
      console.log(result);
      if (err) {
        return console.log("login error in server");
      }
      // console.log(result);
      if (result.length > 0) {
        bcrypt.compare(
          password.toString(),
          result[0].password,
          (err, response) => {
            if (err) return console.log("password compare errror");

            if (response) {
              const name = result[0].name;
              const token = jwt.sign({ name }, "secretkey", {
                expiresIn: "10m",
              });
              console.warn(token, "token");
              res.cookie("token", token, {
                httpOnly: true,
              });

              return res.send({ status: "success" });
            } else {
              return console.log("password not matched");
            }
          }
        );
        console.log(token, "token");
        console.log("Login successfully");
      } else {
        res.json("no user found");
      }
    }
  );
};

// logout handler
export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "success" });
};

// getAll Users
export const getAllUsers = async (req, res) => {
  db.query("SELECT * FROM admin_register", (error, results) => {
    if (error) {
      console.error(error);
    } else {
      res.send(results);
    }
  });
};
