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

// update doctor availability
export const doctorAvailabilityStatus = (req, res) => {
  try {
    const userID = req.params.id;
    const { status } = req.body;
    const q = `UPDATE doctor_data SET Doc_Availability = ? WHERE Email = ?`;

    db.query(q, [status, userID], (err, results) => {
      if (err) {
        console.error("Error executing update query:", err);
        res.status(500).send("Error updating user");
        return;
      }

      console.log("doctor availability status updated successfully");
      res.send("doctor availability status updated successfully");
    });
  } catch (error) {
    console.log(error);
  }
};

// getDoctorsStatus
export const getDoctorsStatus = (req, res) => {
  try {
    db.query("SELECT * FROM doctor_data", (error, results) => {
      if (error) {
        console.error(error);
      } else {
        res.send(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// getdoctors_assigned patient
export const assignedPatientDoc = (req, res) => {
  try {
    db.query(
      `SELECT *, COUNT(patient_token.Assigned_doctor) AS assigned_patient
      FROM doctor_data 
      LEFT JOIN patient_token ON doctor_data.Email = patient_token.Assigned_doctor
      GROUP BY doctor_data.Email;`,
      (error, results) => {
        if (error) {
          console.error(error);
        } else {
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// patient-serve
export const PatientServe = (req, res) => {
  try {
    db.query("SELECT * FROM patient_token", (error, results) => {
      if (error) {
        console.error(error);
      } else {
        res.send(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// DisplayDoctorScreen
export const DisplayDoctorScreen = (req, res) => {
  try {
    const query = `
    SELECT *
    FROM patient_token
    JOIN patient_details ON  patient_token.uhid= patient_details.uhid
    JOIN doctor_data ON patient_token.Assigned_doctor = doctor_data.Email
  `;
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Error retrieving data");
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// doctor-data-update
export const doctorDataUpdate = (req, res) => {
  try {
    const { Doc_ID, Doctor_name, Email, Mobile, Department_name } = req.body;

    const q = "SELECT * FROM doctor_data WHERE Email = ?";
    db.query(q, [req.body.Email], (err, data) => {
      if (err) return res.status(500).send(err);

      const values = [
        req.body.Doc_ID,
        req.body.Doctor_name,
        req.body.Email,
        req.body.Mobile,
        req.body.Department_name,
      ];

      const q = `UPDATE doctor_data SET Doc_ID = ?, Doctor_name = ?, Email = ?, Mobile = ?, Department_name = ? WHERE Email = ?`;

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json("password updated successfull");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
