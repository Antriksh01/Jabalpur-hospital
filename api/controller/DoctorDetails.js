import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mysql from "mysql";
import session from "express-session";

// add receptionist
export const addDoctor = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM doctor_data WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email already exists!");
    //CREATE A NEW USER

    const q =
      "INSERT INTO doctor_data (`Doctor_name`,`email`,`mobile`,`Department_name`) VALUE (?)";

    const values = [
      req.body.Doctor_name,
      req.body.email,
      req.body.mobile,
      req.body.Department_name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("Doctor has been Added.");
    });
  });
};
