import express from "express";
import {
  registerUser,
  registerAdmin,
  loginUser,
  loginAdmin,
} from "../controllers/authController.js";

const router = express.Router();

// Registration
router.post("/register/user", registerUser);
router.post("/register/admin", registerAdmin);

// Login
router.post("/login/user", loginUser);
router.post("/login/admin", loginAdmin);

export default router;
