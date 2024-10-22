import express from "express";

// controllers functions
import { Login, Signup, Logout } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
