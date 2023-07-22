const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mysql = require("mysql");
const session = require("express-session");
const { db } = require("../connect");

// add receptionist
const addDoctor = (req, res) => {
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
const doctorAvailabilityStatus = (req, res) => {
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
const getDoctorsStatus = (req, res) => {
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
const assignedPatientDoc = (req, res) => {
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
const PatientServe = (req, res) => {
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
const DisplayDoctorScreen = (req, res) => {
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

const doctorDataUpdate = (req, res) => {
  try {
    const {
      Doctor_name,
      Email,
      Mobile,
      Department_name,
      working_days,
      off_days,
    } = req.body;

    const Doc_ID = req.params.Doc_ID;

    const selectQuery = "SELECT * FROM doctor_data WHERE Email = ?";
    db.query(selectQuery, [Email], (err, selectResult) => {
      if (err) return res.status(500).send(err);

      if (selectResult.length === 0) {
        return res.status(404).json("Doctor not found");
      }

      const updateQuery =
        "UPDATE doctor_data SET Doctor_name = ?, Mobile = ?, Department_name = ?, working_days = ?, off_days = ? WHERE Email = ? AND Doc_ID = ?";
      const updateValues = [
        Doctor_name,
        Mobile,
        Department_name,
        working_days,
        off_days,
        Email,
        Doc_ID,
      ];

      db.query(updateQuery, updateValues, (err, updateResult) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json("Doctor data updated successfully");
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("An error occurred while updating the doctor data");
  }
};

// display doctor via url parameter

const doctorLiveDisplay = (req, res) => {
  const docId = req.params.id;
  try {
    const query = `
    SELECT *
    FROM patient_token
    JOIN patient_details ON patient_token.uhid = patient_details.uhid
    JOIN doctor_data ON patient_token.Assigned_doctor = doctor_data.Email
    WHERE doctor_data.Doc_ID = ?  -- Add a WHERE condition to filter by Doc_ID
  `;
    db.query(query, [docId], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Error retrieving data");
      }

      if (results.length > 0) {
        res.json(results);
      } else {
        res.send({ msg: "No results found" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// delete Doctor
const deleteDoctorHandler = (req, res) => {
  try {
    const docID = req.params.Doc_ID;

    const q = "DELETE FROM doctor_data WHERE Doc_ID = ?";
    db.query(q, [docID], (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.affectedRows === 0) {
        return res.status(404).json("Doctor not found");
      }
      return res.status(200).json("Doctor data deleted successfully");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
};

module.exports = {
  addDoctor,
  doctorAvailabilityStatus,
  getDoctorsStatus,
  assignedPatientDoc,
  PatientServe,
  DisplayDoctorScreen,
  doctorDataUpdate,
  doctorLiveDisplay,
  deleteDoctorHandler,
};
