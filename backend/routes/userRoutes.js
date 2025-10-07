import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.get("/profile", authMiddleware(["user"]), getUserProfile);


export default router;