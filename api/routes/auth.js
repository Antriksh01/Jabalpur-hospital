const express = require("express");
const {
  login,
  register,
  dataLogin,
  logout,
  getAllUsers,
  adminApproval,
  sendOtp,
  verifyOtpPasswordUpdate,
} = require("../controller/auth.js");
const {
  PatientTokenGeneration,
  SearchPatientController,
  addReceptionist,
  deleteReceptionistData,
  getAllPatient,
  getPatientDetails,
  joinPatientTable,
  receptionistDetailsUpdate,
} = require("../controller/ReceptionistDetails.js");
// const { isAdmin, isDoctor, isReception } = "../middleware/middleware.js";
const {
  DisplayDoctorScreen,
  PatientServe,
  addDoctor,
  assignedPatientDoc,
  deleteDoctorHandler,
  doctorAvailabilityStatus,
  doctorDataUpdate,
  doctorLiveDisplay,
  getDoctorsStatus,
} = require("../controller/DoctorDetails.js");
const {
  SearchTokenHistory,
  searchAvailableDoctor,
  searchPatientAssigned,
  searchPatientMIssed,
  searchPatientQueue,
  searchPatientServe,
  sendEmailSms,
  sendSMS,
  sendWhatsapp,
  tokenRecStatus,
} = require("../controller/sendReciepts.js");
const {
  doctorReports,
  receptionistMiniReport,
  // receptionistReport,
  tokenReport,
} = require("../controller/Report.js");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/reset-password/verify", verifyOtpPasswordUpdate);
router.get("/", dataLogin);
router.get("/logout", logout);
router.get("/users", getAllUsers);
router.post("/add-receptionist", addReceptionist);
router.post("/add-doctor", addDoctor);
router.post("/PatientTokenGeneration", PatientTokenGeneration);
router.get("/getAllPatient", getAllPatient);
router.get("/tokenReciept", joinPatientTable);
router.get("/Search-patient", SearchPatientController);
router.post("/sendSMS", sendSMS);
router.post("/sendWhatsapp", sendWhatsapp);
router.post("/sendEmailSms", sendEmailSms);
router.put("/tokenRecStatus/:tokenID/:userID", tokenRecStatus);
router.put("/doctor-availability-update/:id", doctorAvailabilityStatus);
router.get("/getDoctorsStatus", getDoctorsStatus);
router.get("/getAssignedDoc", assignedPatientDoc);
router.get("/patientServe", PatientServe);
router.get("/display-doctor-screen", DisplayDoctorScreen);
router.put("/doctorDataUpdate/:Doc_ID", doctorDataUpdate);
router.get("/doctorLive/:id", doctorLiveDisplay);
router.delete("/doctor-data-delete/:Doc_ID", deleteDoctorHandler);
router.get("/get-patient-details", getPatientDetails);
router.put("/update-rec-details/:Rec_ID", receptionistDetailsUpdate);
router.delete("/delete-receptionist/:id", deleteReceptionistData);
router.put("/admin-approval-update/:id", adminApproval);
router.post("/sendOtp", sendOtp);
router.post("/token-report", tokenReport);
// router.get("/receptionist-report/:recId", receptionistReport);
router.post("/receptionistMiniReport", receptionistMiniReport);
router.post("/doctors-report", doctorReports);

// Search query
router.get("/searchTokenhistory", SearchTokenHistory);
router.get("/searchPatientQueue", searchPatientQueue);
router.get("/searchPatientServe", searchPatientServe);
router.get("/missed-partient", searchPatientMIssed);
router.get("/searchAvailableDoctor", searchAvailableDoctor);
router.get("/searchPatientAssigned", searchPatientAssigned);

module.exports = router;
