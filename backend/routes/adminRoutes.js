import express from "express";
import { getExpenditures } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.get("/expenditures", authMiddleware(["admin"]), getExpenditures);


export default router;