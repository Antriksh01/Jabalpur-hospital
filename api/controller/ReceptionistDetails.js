const { db } = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mysql = require("mysql");
const session = require("express-session");

// add receptionist
const addReceptionist = (req, res) => {
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
const updateReceptionist = (req, res) => {
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
const PatientTokenGeneration = (req, res) => {
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

const getAllPatient = async (req, res) => {
  db.query("SELECT * FROM patient_token", (error, results) => {
    if (error) {
      console.error(error);
    } else {
      res.send(results);
    }
  });
};

// join-tables
const joinPatientTable = async (req, res) => {
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
const SearchPatientController = async (req, res) => {
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

// get patient details
const getPatientDetails = (req, res) => {
  try {
    db.query("SELECT * FROM receptionist", (error, results) => {
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

// receptionistDetailsUpdate
const receptionistDetailsUpdate = (req, res) => {
  try {
    const {
      fullname,
      mobile,
      email,
      Rec_ID,
      Workingday,
      Offday,
      AssignedCounter,
    } = req.body;
    const recID = req.params.Rec_ID;
    const selectQuery = "SELECT * FROM receptionist WHERE email = ?";

    db.query(selectQuery, [email], (err, selectResult) => {
      if (err) return res.status(500).send(err);

      if (selectResult.length === 0) {
        return res.status(404).json("Receptionist not found");
      }

      const updateQuery =
        "UPDATE receptionist SET fullname =?, mobile = ?, Workingday = ?, Offday = ?, AssignedCounter = ? WHERE email = ? AND Rec_ID = ?";
      const updateValues = [
        fullname,
        mobile,
        Workingday,
        Offday,
        AssignedCounter,
        email,
        recID,
      ];

      db.query(updateQuery, updateValues, (err, updateResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database error" });
        }

        return res
          .status(200)
          .json({ message: "Receptionist data updated successfully" });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//delete receptionist data
const deleteReceptionistData = (req, res) => {
  try {
    const rec_ID = req.params.id;
    const q = "DELETE FROM receptionist WHERE Rec_ID = ?";

    db.query(q, [rec_ID], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) {
        return res.status(404).json("receptionist not found");
      }
      return res.status(200).json("receptionist data deleted");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addReceptionist,
  updateReceptionist,
  PatientTokenGeneration,
  getAllPatient,
  joinPatientTable,
  SearchPatientController,
  getPatientDetails,
  receptionistDetailsUpdate,
  deleteReceptionistData,
};
