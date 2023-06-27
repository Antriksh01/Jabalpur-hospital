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

  const q = "SELECT * FROM patient_token WHERE Token_ID = ?";

  db.query(q, [req.body.Token_ID], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Token already Generated!");
    //CREATE A NEW USER

    const q =
      "INSERT INTO patient_token (`Token_ID`,`uhid`, `P_Email`, `P_Contact`, `Assigned_doctor`,`Time`, `Dept`,`Token_Generated`, `Token_Generated_by`, `Room_No`, `Counter_No`) VALUE (?)";

    const values = [
      req.body.Token_ID,
      req.body.uhid,
      req.body.P_Email,
      req.body.P_Contact,
      req.body.Assigned_doctor,
      req.body.Time,
      req.body.Dept,
      req.body.Token_Generated,
      req.body.Token_Generated_by,
      req.body.Room_No,
      req.body.Counter_No,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      //   console.log(err);
      return res.status(200).send("Token has been Generated successfully");
    });
  });
};

// get-patient

export const getAllPatient = async (req, res) => {
  db.query("SELECT * FROM patient_token", (error, results) => {
    if (error) {
      console.error(error);
    } else {
      res.send(results);
    }
  });
};

// join-tables
export const joinPatientTable = async (req, res) => {
  const query = `
    SELECT *
    FROM patient_token
    JOIN patient_details ON  patient_token.uhid= patient_details.uhid
    JOIN doctor_data ON patient_token.Assigned_doctor = doctor_data.Email
    JOIN receptionist ON patient_token.Token_Generated_by = receptionist.email
    JOIN admin_register ON patient_token.Assigned_doctor = admin_register.reg_email
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Error retrieving data");
    } else {
      res.json(results);
    }
  });
};

//Patient search controller
export const SearchPatientController = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    // const query = `SELECT * FROM patient_token WHERE P_Email LIKE '%${keyword}%'`;
    const query = `SELECT *
    FROM patient_token
    JOIN patient_details ON  patient_token.uhid= patient_details.uhid
   
    WHERE patient_token.P_Email LIKE '%${keyword}%'
       OR patient_details.firstname LIKE '%${keyword}%'`;
    //  OR doctor_data.Doctor_name LIKE '%${keyword}%'`;

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
};
