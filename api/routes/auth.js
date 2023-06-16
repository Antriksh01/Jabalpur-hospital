import express from "express";
import { login, sendEmail, register } from "../controller/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/password-reset", sendEmail);

export default router;
