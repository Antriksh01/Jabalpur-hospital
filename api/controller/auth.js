import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mysql from "mysql";

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
      "INSERT INTO admin_register (`username`,`mobile`,`email`, `password`,`cpassword`,`role`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.mobile,
      req.body.email,
      hashedPassword,
      hashedPassword,
      req.body.role,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = async (req, res) => {
  const q = "SELECT * FROM admin_register WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(404).send({
        success: false,
        msg: "invalid password",
      });
    // token
    const token = jwt.sign({ id: data[0].id }, "secretkey", {
      expiresIn: "1h",
    });

    const { password, ...others } = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true,
    });
    res.status(200).send({
      success: true,
      msg: "successfully login",

      token,
    });
  });
};

export const sendEmail = (req, res) => {
  const { email, password, cpassword } = req.body;
  const q = "SELECT * FROM admin_register WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = `UPDATE admin_register SET password = ? WHERE email = ?`;

    // const values = [req.body.email, hashedPassword, hashedPassword];

    db.query(q, [req.body.email, req.body.hashedPassword], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("password updated successfull");
    });
  });
};
