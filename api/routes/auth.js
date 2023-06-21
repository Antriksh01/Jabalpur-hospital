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
  addReceptionist,
  updateReceptionist,
} from "../controller/ReceptionistDetails.js";
import { isAdmin, verifyUser } from "../middleware/middleware.js";
import { addDoctor } from "../controller/DoctorDetails.js";

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

export default router;
