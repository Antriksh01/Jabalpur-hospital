const { db } = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mysql = require("mysql");
const session = require("express-session");
const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// send-text-sms
const sendSMS = (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages
    .create({
      from: process.env.TWILIONUMBER,
      to: phoneNumber,
      body: message,
    })
    .then(() => {
      res.send("Message sent successfully!");
      console.log("message has sent");
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
      res.status(500).send("Error sending SMS");
    });
};

// send-whatsapp
const sendWhatsapp = (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages
    .create({
      body: message,
      from: "whatsapp:+14155238886",
      to: phoneNumber,
    })
    .then((message) => {
      console.log("WhatsApp message sent successfully:", message.sid);
      res.send("WhatsApp message sent successfully");
    })
    .catch((error) => {
      console.error("Error sending WhatsApp message:", error);
      res.status(500).send("Error sending WhatsApp message");
    });
};

// send_email
const sendEmailSms = (req, res) => {
  const { to, subject, text } = req.body;
  // Configure Nodemailer

  const transporter = nodemailer.createTransport({
    // Set up your email service provider here
    // service: "Gmail",
    // auth: {
    //   user: "abhishekdoaguru@gmail.com",
    //   pass: "onmkmsfelvgnfnoa",
    // },
    host: "mail.api.dvjei.org",
    port: 587,
    secure: false,
    auth: {
      user: "your-email@example.com", // Replace with your email address
      pass: "your-email-password", // Replace with your email password
    },
  });

  const mailOptions = {
    from: "abhishekdoaguru@gmail.com",
    to,
    subject,
    text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("An error occurred while sending the email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
};

// updatetokenreciept

// test-5
const tokenRecStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const tokenIDToUpdate = req.params.tokenID;
    const loggedInDoctorID = req.params.userID; // Assuming the logged-in doctor ID is available in req.params.doctorID

    const selectQuery =
      "SELECT Token_ID, Assigned_doctor, Time FROM patient_token WHERE Assigned_doctor = ? ORDER BY Token_ID";
    const updateQuery =
      "UPDATE patient_token SET treatment_status = ?, Time = ? WHERE Token_ID = ?";

    db.query(selectQuery, [loggedInDoctorID], (err, results) => {
      if (err) {
        console.error("Error executing select query:", err);
        res.status(500).send("Error updating timestamps");
        return;
      }

      const updatePromises = [];
      let nextTime = null;

      for (let i = 0; i < results.length; i++) {
        const { Token_ID, Assigned_doctor, Time } = results[i];
        const currentTime = new Date();

        if (Token_ID === tokenIDToUpdate) {
          // Update both status and time for the selected Token_ID
          updatePromises.push(
            new Promise((resolve, reject) => {
              db.query(updateQuery, [status, Time, Token_ID], (err) => {
                if (err) {
                  console.error(
                    "Error updating status for Token_ID:",
                    Token_ID,
                    err
                  );
                  reject(err);
                } else {
                  resolve();
                }
              });
            })
          );
        } else {
          // Update the time for other tokens without changing the status
          const updatedTime = nextTime || currentTime;
          nextTime = new Date(updatedTime.getTime() + 15 * 60000);

          updatePromises.push(
            new Promise((resolve, reject) => {
              db.query(
                "UPDATE patient_token SET Time = ? WHERE Token_ID = ?",
                [updatedTime, Token_ID],
                (err) => {
                  if (err) {
                    console.error(
                      "Error updating time for Token_ID:",
                      Token_ID,
                      err
                    );
                    reject(err);
                  } else {
                    resolve();
                  }
                }
              );
            })
          );
        }
      }

      Promise.all(updatePromises)
        .then(() => {
          console.log("Timestamps updated successfully");
          res.send("Timestamps updated successfully");
        })
        .catch((err) => {
          console.error("Error updating timestamps:", err);
          res.status(500).send("Error updating timestamps");
        });
    });
  } catch (error) {
    console.log(error);
  }
};

// getToken monthwise
const monthWiseToken = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// search token History
const SearchTokenHistory = (req, res) => {
  try {
    const keyword = req.query.keyword;
    let query = `SELECT *
      FROM doctor_data
      JOIN patient_token ON doctor_data.Email = patient_token.Assigned_doctor
      JOIN patient_details ON patient_token.uhid = patient_details.uhid
      WHERE 1 = 1`;

    if (keyword) {
      query += ` AND (doctor_data.Doctor_name LIKE '%${keyword}%'
              OR doctor_data.Email LIKE '%${keyword}%'
              OR doctor_data.Mobile LIKE '%${keyword}%'
              OR doctor_data.Department_name LIKE '%${keyword}%'
              OR patient_details.firstname LIKE '%${keyword}%'
              OR patient_details.lastname LIKE '%${keyword}%'
              OR patient_token.P_Contact LIKE '%${keyword}%'
              OR patient_token.P_Email LIKE '%${keyword}%')`;
    }

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// search patient in queue
const searchPatientQueue = (req, res) => {
  try {
    const keyword = req.query.keyword;
    let query = `SELECT *
      FROM patient_token
      JOIN patient_details ON patient_token.uhid = patient_details.uhid
      WHERE patient_token.treatment_status = 'Pending'`;

    if (keyword) {
      query += ` AND (patient_token.Assigned_doctor LIKE '%${keyword}%'
              OR patient_details.firstname LIKE '%${keyword}%'
              OR patient_details.lastname LIKE '%${keyword}%'
              OR patient_token.P_Contact LIKE '%${keyword}%'
              OR patient_token.P_Email LIKE '%${keyword}%')`;
    }

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// search patient in queue
const searchPatientServe = (req, res) => {
  try {
    const keyword = req.query.keyword;
    let query = `SELECT *
      FROM patient_token
      JOIN patient_details ON patient_token.uhid = patient_details.uhid
      WHERE patient_token.treatment_status = 'Treated'`;

    if (keyword) {
      query += ` AND (patient_token.Assigned_doctor LIKE '%${keyword}%'
              OR patient_details.firstname LIKE '%${keyword}%'
              OR patient_details.lastname LIKE '%${keyword}%'
              OR patient_token.P_Contact LIKE '%${keyword}%'
              OR patient_token.P_Email LIKE '%${keyword}%')`;
    }

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// missed patient
const searchPatientMIssed = (req, res) => {
  try {
    const keyword = req.query.keyword;
    let query = `SELECT *
      FROM patient_token
      JOIN patient_details ON patient_token.uhid = patient_details.uhid
      WHERE patient_token.treatment_status = 'Patient_Absent'`;

    if (keyword) {
      query += ` AND (patient_token.Assigned_doctor LIKE '%${keyword}%'
              OR patient_details.firstname LIKE '%${keyword}%'
              OR patient_details.lastname LIKE '%${keyword}%'
              OR patient_token.P_Contact LIKE '%${keyword}%'
              OR patient_token.P_Email LIKE '%${keyword}%')`;
    }

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// available doctor search
const searchAvailableDoctor = (req, res) => {
  try {
    const keyword = req.query.keyword;
    let query = `SELECT *
      FROM doctor_data
      WHERE 1 = 1`;

    if (keyword) {
      query += ` AND (doctor_data.Doctor_name LIKE '%${keyword}%'
              OR doctor_data.Email LIKE '%${keyword}%'
              OR doctor_data.Mobile LIKE '%${keyword}%')
              OR doctor_data.Department_name Like '%${keyword}%'`;
    }

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// searchP patient assigned to specific doctor

const searchPatientAssigned = (req, res) => {
  try {
    const keyword = req.query.keyword;
    let query = `SELECT *
      FROM doctor_data
      JOIN patient_token ON doctor_data.Email = patient_token.Assigned_doctor
      JOIN patient_details ON patient_token.uhid = patient_details.uhid
      WHERE 1 = 1`;

    if (keyword) {
      query += ` AND (doctor_data.Doctor_name LIKE '%${keyword}%'
              OR doctor_data.Email LIKE '%${keyword}%'
              OR doctor_data.Mobile LIKE '%${keyword}%'
              OR doctor_data.Department_name LIKE '%${keyword}%'
              OR patient_details.firstname LIKE '%${keyword}%'
              OR patient_details.lastname LIKE '%${keyword}%'
              OR patient_token.P_Contact LIKE '%${keyword}%'
              OR patient_details.emailid LIKE '%${keyword}%')`;
    }

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendSMS,
  sendWhatsapp,
  sendEmailSms,
  tokenRecStatus,
  monthWiseToken,
  SearchTokenHistory,
  searchPatientQueue,
  searchPatientServe,
  searchPatientMIssed,
  searchAvailableDoctor,
  searchPatientAssigned,
};
