import express from "express";
import {
  login,
  sendEmail,
  register,
  dataLogin,
  logout,
  getAllUsers,
} from "../controller/auth.js";
import {
  PatientTokenGeneration,
  SearchPatientController,
  addReceptionist,
  getAllPatient,
  joinPatientTable,
  updateReceptionist,
} from "../controller/ReceptionistDetails.js";
import { isAdmin, verifyUser } from "../middleware/middleware.js";
import {
  PatientServe,
  addDoctor,
  assignedPatientDoc,
  doctorAvailabilityStatus,
  getDoctorsStatus,
} from "../controller/DoctorDetails.js";
import {
  sendEmailSms,
  sendSMS,
  sendWhatsapp,
  tokenRecStatus,
} from "../controller/sendReciepts.js";

const router = express.Router();

router.post("/login", isAdmin, login);
router.post("/register", register);
router.post("/password-reset", sendEmail);
router.get("/", verifyUser, isAdmin, dataLogin);
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
router.put("/tokenRecStatus/:id", tokenRecStatus);
router.put("/doctor-availability-update/:id", doctorAvailabilityStatus);
router.get("/getDoctorsStatus", getDoctorsStatus);
router.get("/getAssignedDoc", assignedPatientDoc);
router.get("/patientServe", PatientServe);

export default router;
