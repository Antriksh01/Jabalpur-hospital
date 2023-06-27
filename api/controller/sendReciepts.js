import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mysql from "mysql";
import session from "express-session";
import twilio from "twilio";

const ACCOUNT_SID = "AC497b7b2e364b9aa2b2260b30951b4986";
const AUTH_TOKEN = "24059079c86f6942d7ddc2f799e5aa97";
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// send-text-sms
export const sendSMS = (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages
    .create({
      from: "+14846737876",
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
export const sendWhatsapp = (req, res) => {
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
export const sendEmailSms = (req, res) => {
  const { to, subject, text } = req.body;
  // Configure Nodemailer

  const transporter = nodemailer.createTransport({
    // Set up your email service provider here
    service: "Gmail",
    auth: {
      user: "abhishekdoaguru@gmail.com",
      pass: "onmkmsfelvgnfnoa",
    },
  });

  const mailOptions = {
    from: "Abhishek_doaguru@gmail.com",
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

export const tokenRecStatus = async (req, res) => {
  try {
    const userID = req.params.id;
    const { status } = req.body;

    const q = `UPDATE patient_token SET treatment_status = ? WHERE Token_ID = ?`;

    db.query(q, [status, userID], (err, results) => {
      if (err) {
        console.error("Error executing update query:", err);
        res.status(500).send("Error updating user");
        return;
      }

      console.log("treatment status updated successfully");
      res.send("treatment status updated successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
