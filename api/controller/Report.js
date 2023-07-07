import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mysql from "mysql";
import session from "express-session";
import xlsx from "xlsx";
import fs from "fs";

function formatDate(date, format) {
  const d = new Date(date);

  const formatTokens = {
    dd: String(d.getDate()).padStart(2, "0"), // Day with leading zero
    MM: String(d.getMonth() + 1).padStart(2, "0"), // Month with leading zero (Note: Month is zero-based)
    yyyy: String(d.getFullYear()), // Full year
  };

  let formattedDate = format;
  for (const token in formatTokens) {
    formattedDate = formattedDate.replace(token, formatTokens[token]);
  }

  return formattedDate;
}

export const tokenReport = (req, res) => {
  const { fromDate, toDate } = req.body;

  try {
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const query = `SELECT * FROM patient_token
    JOIN doctor_data ON patient_token.Assigned_doctor = doctor_data.Email
    JOIN patient_details ON  patient_token.uhid= patient_details.uhid
    JOIN receptionist ON patient_token.Token_Generated_by = receptionist.email
     WHERE Time >= ? AND Time <= ?`;

    db.query(query, [fromDate, toDate], (err, results) => {
      if (err) {
        console.error("Error retrieving token data: ", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
      }
      console.log(results);
      const reportData = results.map((row) => ({
        uhid: row.uhid,
        tokenNumber: row.Token_ID,
        date: formatDate(row.Time, "dd-MM-yyyy"),
        patient_email: row.P_Email,
        patient_name: row.firstname + " " + row.lastname,
        patient_contact: row.P_Contact,
        assigned_doctor: row.Doctor_name,
        Dept: row.Dept,
        Token_generated_by: row.fullname,
        status: row.treatment_status,
        // Include other relevant fields from the table
      }));

      // Return the generated report data
      res.json(reportData);
    });
  } catch (error) {
    console.log(error);
  }
};
// detailed
// export const receptionistReport = (req, res) => {
//   const { fromDate, toDate } = req.body;
//   const { recId } = req.params;

//   try {
//     if (!fromDate || !toDate) {
//       return res.status(400).json({ error: "Invalid input" });
//     }

//     let query = `SELECT
//         receptionist.Rec_ID,
//         receptionist.fullname AS Token_generated_by,
//         COUNT(patient_token.Token_Generated_by) AS total_Token_Generates,
//         patient_token.uhid,
//         patient_token.Token_ID,
//         patient_token.Time,
//         patient_token.P_Email,
//         patient_token.P_Contact,
//         doctor_data.Doctor_name,
//         patient_token.Dept,
//         patient_token.treatment_status
//       FROM patient_token
//       JOIN doctor_data ON patient_token.Assigned_doctor = doctor_data.Email
//       JOIN patient_details ON patient_token.uhid = patient_details.uhid
//       JOIN receptionist ON patient_token.Token_Generated_by = receptionist.email
//       WHERE Time >= ? AND Time <= ?`;

//     const queryParams = [fromDate, toDate];

//     if (recId) {
//       query += " AND receptionist.Rec_ID = ?";
//       queryParams.push(recId);
//     }

//     query +=
//       " GROUP BY receptionist.Rec_ID, Token_generated_by, patient_token.uhid, patient_token.Token_ID";

//     db.query(query, queryParams, (err, results) => {
//       if (err) {
//         console.error("Error retrieving token data: ", err);
//         return res.status(500).json({ error: "An unexpected error occurred" });
//       }
//       console.log(results);
//       const reportData = results.map((row) => ({
//         Rec_ID: row.Rec_ID,
//         Token_generated_by: row.Token_generated_by,
//         total_Token_Generates: row.total_Token_Generates,
//         uhid: row.uhid,
//         Token_ID: row.Token_ID,
//         Time: row.Time,
//         P_Email: row.P_Email,
//         P_Contact: row.P_Contact,
//         Doctor_name: row.Doctor_name,
//         Dept: row.Dept,
//         treatment_status: row.treatment_status,
//       }));

//       // Return the generated report data
//       res.json(reportData);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const receptionistMiniReport = (req, res) => {
  const { fromDate, toDate } = req.body;

  try {
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const query = `SELECT 
        receptionist.Rec_ID,
        receptionist.fullname AS Token_generated_by,
        receptionist.AssignedCounter,
        COUNT(patient_token.Token_Generated_by) AS total_Token_Generates
      FROM patient_token
      JOIN doctor_data ON patient_token.Assigned_doctor = doctor_data.Email
      JOIN patient_details ON patient_token.uhid = patient_details.uhid
      JOIN receptionist ON patient_token.Token_Generated_by = receptionist.email
      WHERE Time >= ? AND Time <= ?
      GROUP BY receptionist.Rec_ID, Token_generated_by`;

    db.query(query, [fromDate, toDate], (err, results) => {
      if (err) {
        console.error("Error retrieving token data: ", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
      }
      console.log(results);
      const reportData = results.map((row) => ({
        Rec_ID: row.Rec_ID,
        Token_generated_by: row.Token_generated_by,
        total_Token_Generates: row.total_Token_Generates,
        counter_no: row.AssignedCounter,
      }));

      // Return the generated report data
      res.json(reportData);
    });
  } catch (error) {
    console.log(error);
  }
};

// doctor-report
export const doctorReports = (req, res) => {
  const { fromDate, toDate } = req.body;
  try {
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const query = `SELECT 
    doctor_data.Doc_ID,
    doctor_data.Doctor_name,
    doctor_data.Department_name,
    doctor_data.Email,
    doctor_data.Mobile,
    doctor_data.Doc_Availability,
    doctor_data.working_days,
    doctor_data.off_days,
    COUNT(patient_token.treatment_status) AS total_Patient,
    COUNT(*) AS total_tokens,
    COUNT(CASE WHEN patient_token.treatment_status = 'Treated' THEN 1 END) AS completed_Tokens,
    COUNT(CASE WHEN patient_token.treatment_status = 'Patient_Absent' THEN 1 END) AS absent_patient,
    COUNT(CASE WHEN patient_token.treatment_status = 'Pending' THEN 1 END) AS pending_Tokens
  FROM patient_token
  JOIN doctor_data ON patient_token.Assigned_doctor = doctor_data.Email
  JOIN patient_details ON patient_token.uhid = patient_details.uhid
  JOIN receptionist ON patient_token.Token_Generated_by = receptionist.email
  WHERE Time >= ? AND Time <= ?
  GROUP BY doctor_data.Doc_ID, doctor_data.Doctor_name, doctor_data.Department_name;`;

    db.query(query, [fromDate, toDate], (err, results) => {
      if (err) {
        console.error("Error retrieving token data: ", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
      }
      console.log(results);
      const reportData = results.map((row) => ({
        Doc_ID: row.Doc_ID,
        Department: row.Department_name,
        Doctor_name: row.Doctor_name,
        Total_Patient: row.total_tokens,
        Served_patient: row.completed_Tokens,
        Absent_Patient: row.absent_patient,
        Pending_Patient: row.pending_Tokens,
        Doctor_contact_number: row.Mobile,
        Doctor_Email: row.Email,
        Available: row.Doc_Availability,
        Working_days: row.working_days,
        off_days: row.off_days,
      }));

      // Return the generated report data
      res.json(reportData);
    });
  } catch (error) {
    console.log(error);
  }
};
