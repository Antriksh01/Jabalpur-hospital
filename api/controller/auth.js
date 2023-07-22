const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mysql = require("mysql");
const session = require("express-session");
const dotenv = require("dotenv");
const { db } = require("../connect");
dotenv.config();

const register = (req, res) => {
  const { username, mobile, reg_email, password, role } = req.body;

  // Check if the user already exists in admin_register table
  const checkUserQuery = "SELECT * FROM admin_register WHERE username = ?";
  db.query(checkUserQuery, [username], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Insert user into admin_register table
    const insertUserQuery =
      "INSERT INTO admin_register (username, mobile, reg_email, password, role) VALUES (?, ?, ?, ?, ?)";
    const values = [username, mobile, reg_email, hashedPassword, role];
    db.query(insertUserQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      // Insert user into additional tables based on role
      if (role === "Doctor") {
        const insertDoctorQuery =
          "INSERT INTO doctor_data (Doctor_name, Email) VALUES (?, ?)";
        const doctorValues = [username, reg_email];
        db.query(insertDoctorQuery, doctorValues, (err, adminResult) => {
          if (err) {
            // Handle database error
            return res.status(500).json({ message: "Failed to register user" });
          }
        });
      } else if (role === "Receptionist") {
        const insertReceptionistQuery =
          "INSERT INTO receptionist (fullname, email) VALUES (?,?)";
        const receptionistValues = [username, reg_email];
        db.query(
          insertReceptionistQuery,
          receptionistValues,
          (err, receptionistResult) => {
            if (err) {
              // Handle database error
              return res
                .status(500)
                .json({ message: "Failed to register user" });
            }
          }
        );
      }

      // Insert user into otp_details table
      const insertOTPQuery =
        "INSERT INTO otp_details (ID, Email) VALUES (?, ?)";
      const otpValues = [result.insertId, reg_email];
      db.query(insertOTPQuery, otpValues, (err, otpResult) => {
        if (err) {
          // Handle database error
          return res.status(500).json({ message: "Failed to register user" });
        }
      });

      return res.status(200).json("User has been created.");
    });
  });
};

// send-otp
const sendOtp = (req, res) => {
  const { email } = req.body;
  // random otp
  function generateOTP(length) {
    const chars = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars[randomIndex];
    }

    return otp;
  }
  const OTP = generateOTP(6);
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "Password Reset Otp",
      text: `Your OTP for password reset is: ${OTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json("An error occurred while sending the email.");
      } else {
        console.log("Otp sent:", info.response);
        res.status(200).send("Otp sent successfully!");
      }
    });

    db.query(
      "UPDATE otp_details SET Otp = ? WHERE Email = ?",
      [OTP, email],
      (err, result) => {
        if (err) {
          return res.status(500).send({ message: "Failed to store OTP" });
        }

        res.status(200).json({ message: "OTP sent successfully" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//forgot password
const verifyOtpPasswordUpdate = (req, res) => {
  const { email, otp, password } = req.body;

  // Verify OTP logic
  // Retrieve the stored OTP and its expiration timestamp from the otp_details table for the given email
  db.query(
    "SELECT Otp FROM otp_details WHERE Email = ? AND Otp = ? AND NOW() <= Otp_expiry",
    [email, otp],
    (err, data) => {
      if (err) {
        // Handle database error
        return res.status(500).json({ message: "Failed to verify OTP" });
      }
      console.log(data);
      // Check if the OTP exists in the database response
      if (data.length === []) {
        return res
          .status(400)
          .json({ message: "Invalid OTP or OTP has expired" });
      }

      // Generate salt and hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Update the user's password in the admin_register table
      db.query(
        "UPDATE admin_register SET password = ? WHERE reg_email = ?",
        [hashedPassword, email],
        (err, result) => {
          if (err) {
            // Handle database error
            return res
              .status(500)
              .json({ message: "Failed to update password" });
          }

          // Check if any rows were affected by the update query
          if (result.affectedRows === 0) {
            return res.status(400).json({ message: "User not found" });
          }

          // Return success response
          res.status(200).json({ message: "Password updated successfully" });
        }
      );
    }
  );
};

const dataLogin = async (req, res) => {
  return res.json({ Status: "success", name: req.name });
  // console.log(res);
};

// login
const login = async (req, res) => {
  try {
    const loginCredential = req.body.loginCredential;
    const password = req.body.password;

    const query =
      "SELECT * FROM admin_register WHERE username = ? OR reg_email = ? OR mobile = ?";
    const values = [loginCredential, loginCredential, loginCredential];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Login error in server:", err);
        return res
          .status(500)
          .send({ status: "error", message: "Internal server error" });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (bcryptErr, response) => {
          if (bcryptErr) {
            console.error("Bcrypt error:", bcryptErr);
            return res
              .status(500)
              .send({ status: "error", message: "Internal server error" });
          }

          if (response) {
            const user = result[0];
            const token = jwt.sign(
              { userId: loginCredential },
              "your-secret-key",
              {
                expiresIn: "1h", // Token expiration time
              }
            );

            res.send({ token, user });
          } else {
            res.send({ message: "Wrong username/password" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    });
  } catch (error) {
    console.error("Login error in server:", error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

// logout handler
const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "success" });
};

// getAll Users
const getAllUsers = async (req, res) => {
  db.query("SELECT * FROM admin_register", (error, results) => {
    if (error) {
      console.error(error);
    } else {
      res.send(results);
    }
  });
};

// admin approval
const adminApproval = (req, res) => {
  try {
    const userID = req.params.id;
    const Admin_Approval = req.body.Admin_Approval;
    const selectQuery = "SELECT * FROM admin_register WHERE reg_email = ?";
    db.query(selectQuery, [userID], (err, selectResult) => {
      if (err) return res.status(500).send(err);

      if (selectResult.length === 0) {
        return res.status(404).json("Invalid user");
      }
      const updateQuery =
        "UPDATE admin_register SET Admin_Approval = ? WHERE reg_email = ?";
      const updateValues = [Admin_Approval, userID];

      db.query(updateQuery, updateValues, (err, updateResult) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json("Approved successfully");
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  sendOtp,
  verifyOtpPasswordUpdate,
  dataLogin,
  login,
  logout,
  getAllUsers,
  adminApproval,
};
