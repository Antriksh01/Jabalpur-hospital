import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mysql from "mysql";
import session from "express-session";

// add receptionist
export const addReceptionist = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM receptionist WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email already exists!");
    //CREATE A NEW USER

    const q =
      "INSERT INTO receptionist (`fullname`,`mobile`, `Workingday`, `Offday`,`email`, `AssignedCounter`,`Additionalnotes`) VALUE (?)";

    const values = [
      req.body.fullname,
      req.body.mobile,
      req.body.Workingday,
      req.body.Offday,
      req.body.email,
      req.body.AssignedCounter,
      req.body.Additionalnotes,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      //   console.log(err);
      return res.status(200).send("Receptionist has been Added.");
    });
  });
};

// update receptionist data
export const updateReceptionist = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM receptionist WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length) return res.status(409).json("Email already exists!");
    //CREATE A NEW USER

    const q =
      "UPDATE receptionist SET fullname = ?, mobile = ?, Workingday =?, Offday= ?, AssignedCounter=?, Additionalnotes=?   WHERE email = ?";

    const values = [
      req.body.fullname,
      req.body.mobile,
      req.body.Workingday,
      req.body.Offday,
      req.body.email,
      req.body.AssignedCounter,
      req.body.Additionalnotes,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      //   console.log(err);
      return res.status(200).send("Receptionist details has been updated.");
    });
  });
};

// token-generate
export const PatientTokenGeneration = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM patient_token WHERE P_ID = ?";

  db.query(q, [req.body.P_ID], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Token already Generated!");
    //CREATE A NEW USER

    const q =
      "INSERT INTO patient_token (`P_Name`, `P_Contact`, `Assigned_doctor`,`Time`, `Dept`,`Token_Generated`, `Token_Generated_by`) VALUE (?)";

    const values = [
      req.body.P_Name,
      req.body.P_Contact,
      req.body.Assigned_doctor,
      req.body.Time,
      req.body.Dept,
      req.body.Token_Generated,
      req.body.Token_Generated_by,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      //   console.log(err);
      return res.status(200).send("Token has been Generated successfully");
    });
  });
};
