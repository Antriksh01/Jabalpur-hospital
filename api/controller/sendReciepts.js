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

// export const tokenRecStatus = async (req, res) => {
//   try {
//     const userID = req.params.id;
//     const { status, timestamp } = req.body;

//     const q = `UPDATE patient_token SET treatment_status = ?, Time = CURRENT_TIMESTAMP WHERE Token_ID = ?`;
//     const updateQuery =
//       "UPDATE patient_token SET treatment_status = ?, Time = ?";

//     db.query(q, [status, userID], (err, results) => {
//       if (err) {
//         console.error("Error executing update query:", err);
//         res.status(500).send("Error updating user");
//         return;
//       }

//       results.forEach((row) => {
//         const { Time } = row;
//         const updatedTime = new Date(Time.getTime() + 15 * 60000);

//         db.query(updateQuery, [updatedTime], (err) => {
//           if (err) {
//             console.error(
//               "Error updating timestamp for Token_ID:",
//               Token_ID,
//               err
//             );
//           }
//         });

//         console.log("treatment status updated successfully");
//         res.send("treatment status updated successfully");
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// test-2
// export const tokenRecStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const tokenIDToUpdate = req.params.tokenID;
//     const loggedInUserID = req.params.userID; // Assuming the logged-in user ID is available in req.user.id

//     const selectQuery =
//       "SELECT Token_ID, Time FROM patient_token ORDER BY Token_ID";
//     const updateQuery =
//       "UPDATE patient_token SET treatment_status = ?, Time = ? WHERE Token_ID = ? AND Assigned_doctor = ?";

//     db.query(selectQuery, (err, results) => {
//       if (err) {
//         console.error("Error executing select query:", err);
//         res.status(500).send("Error updating timestamps");
//         return;
//       }

//       let previousTime = new Date();

//       const updatePromises = [];

//       for (let i = 0; i < results.length; i++) {
//         const { Assigned_doctor, Token_ID, Time } = results[i];
//         const currentTime = new Date();

//         let updatedTime;

//         if (
//           Assigned_doctor === loggedInUserID &&
//           Token_ID === tokenIDToUpdate
//         ) {
//           // If it's the token ID being updated, use the current time
//           updatedTime = currentTime;
//         } else {
//           // Update the time based on the previous patient's time
//           updatedTime = new Date(previousTime.getTime() + 15 * 60000);
//         }

//         previousTime = updatedTime;

//         // Check if the user ID is available and update only for the specific Token_ID
//         if (
//           Assigned_doctor === loggedInUserID &&
//           Token_ID === tokenIDToUpdate
//         ) {
//           updatePromises.push(
//             new Promise((resolve, reject) => {
//               db.query(
//                 updateQuery,
//                 [status, updatedTime, Token_ID, Assigned_doctor],
//                 (err) => {
//                   if (err) {
//                     console.error(
//                       "Error updating timestamp for Token_ID:",
//                       Token_ID,
//                       err
//                     );
//                     reject(err);
//                   } else {
//                     resolve();
//                   }
//                 }
//               );
//             })
//           );
//         } else {
//           // Update the time for other patients without changing the status
//           updatePromises.push(
//             new Promise((resolve, reject) => {
//               db.query(
//                 "UPDATE patient_token SET Time = ? WHERE Token_ID = ?",
//                 [updatedTime, Token_ID, Assigned_doctor],
//                 (err) => {
//                   if (err) {
//                     console.error(
//                       "Error updating timestamp for Token_ID:",
//                       Token_ID,
//                       err
//                     );
//                     reject(err);
//                   } else {
//                     resolve();
//                   }
//                 }
//               );
//             })
//           );
//         }
//       }

//       Promise.all(updatePromises)
//         .then(() => {
//           console.log("Timestamps updated successfully");
//           res.send("Timestamps updated successfully");
//         })
//         .catch((err) => {
//           console.error("Error updating timestamps:", err);
//           res.status(500).send("Error updating timestamps");
//         });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// test-3
// export const tokenRecStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const tokenIDToUpdate = req.params.tokenID;
//     const loggedInDoctorID = req.params.userID; // Assuming the logged-in doctor ID is available in req.params.doctorID

//     const selectQuery =
//       "SELECT Token_ID,treatment_status, Assigned_doctor, Time FROM patient_token WHERE Assigned_doctor = ?";
//     const updateQuery =
//       "UPDATE patient_token SET treatment_status = ?, Time = ? WHERE Token_ID = ?";

//     db.query(
//       selectQuery,
//       [loggedInDoctorID, tokenIDToUpdate],
//       (err, results) => {
//         if (err) {
//           console.error("Error executing select query:", err);
//           res.status(500).send("Error updating timestamps");
//           return;
//         }

//         let previousTime = new Date();

//         const updatePromises = [];

//         for (let i = 0; i < results.length; i++) {
//           const { Token_ID, Assigned_doctor, Time } = results[i];
//           const currentTime = new Date();

//           let updatedTime;

//           if (Token_ID === tokenIDToUpdate) {
//             // If it's the token ID being updated, use the current time
//             updatedTime = currentTime;
//           } else {
//             // Update the time based on the previous patient's time
//             updatedTime = new Date(previousTime.getTime() + 15 * 60000);
//           }

//           previousTime = updatedTime;

//           if (Assigned_doctor === loggedInDoctorID) {
//             updatePromises.push(
//               new Promise((resolve, reject) => {
//                 db.query(
//                   updateQuery,
//                   [status, updatedTime, Token_ID],
//                   (err) => {
//                     if (err) {
//                       console.error(
//                         "Error updating timestamp for Token_ID:",
//                         Token_ID,
//                         err
//                       );
//                       reject(err);
//                     } else {
//                       resolve();
//                     }
//                   }
//                 );
//               })
//             );
//           }
//         }

//         Promise.all(updatePromises)
//           .then(() => {
//             console.log("Timestamps updated successfully");
//             res.send("Timestamps updated successfully");
//           })
//           .catch((err) => {
//             console.error("Error updating timestamps:", err);
//             res.status(500).send("Error updating timestamps");
//           });
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
// test-4
// export const tokenRecStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const tokenIDToUpdate = req.params.tokenID;
//     const loggedInDoctorID = req.params.userID; // Assuming the logged-in doctor ID is available in req.params.doctorID

//     const selectQuery =
//       "SELECT Token_ID, Assigned_doctor, Time FROM patient_token WHERE Assigned_doctor = ? ORDER BY Token_ID";
//     const updateQuery =
//       "UPDATE patient_token SET treatment_status = ?, Time = ? WHERE Token_ID = ?";

//     db.query(selectQuery, [loggedInDoctorID], (err, results) => {
//       if (err) {
//         console.error("Error executing select query:", err);
//         res.status(500).send("Error updating timestamps");
//         return;
//       }

//       let previousTime = new Date();

//       const updatePromises = [];

//       for (let i = 1; i < results.length; i++) {
//         const { Token_ID, Assigned_doctor, Time } = results[i];
//         const currentTime = new Date();

//         let updatedTime;

//         if (Token_ID === tokenIDToUpdate) {
//           // If it's the token ID being updated, use the current time
//           updatedTime = currentTime;
//         } else {
//           // Update the time based on the previous patient's time
//           updatedTime = new Date(previousTime.getTime() + 15 * 60000);
//         }

//         previousTime = updatedTime;

//         if (Token_ID === tokenIDToUpdate) {
//           // Update both status and time for the specific Token_ID associated with the logged-in doctor
//           updatePromises.push(
//             new Promise((resolve, reject) => {
//               db.query(updateQuery, [status, updatedTime, Token_ID], (err) => {
//                 if (err) {
//                   console.error(
//                     "Error updating timestamp for Token_ID:",
//                     Token_ID,
//                     err
//                   );
//                   reject(err);
//                 } else {
//                   resolve();
//                 }
//               });
//             })
//           );
//         } else {
//           // Only update the time for other Token_IDs associated with the logged-in doctor
//           updatePromises.push(
//             new Promise((resolve, reject) => {
//               db.query(
//                 "UPDATE patient_token SET Time = ? WHERE Token_ID = ?",
//                 [updatedTime, Token_ID],
//                 (err) => {
//                   if (err) {
//                     console.error(
//                       "Error updating time for Token_ID:",
//                       Token_ID,
//                       err
//                     );
//                     reject(err);
//                   } else {
//                     resolve();
//                   }
//                 }
//               );
//             })
//           );
//         }
//       }

//       Promise.all(updatePromises)
//         .then(() => {
//           console.log("Timestamps updated successfully");
//           res.send("Timestamps updated successfully");
//         })
//         .catch((err) => {
//           console.error("Error updating timestamps:", err);
//           res.status(500).send("Error updating timestamps");
//         });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// test-5
export const tokenRecStatus = async (req, res) => {
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
export const monthWiseToken = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
