import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import NGO from "../models/NGO.js";


dotenv.config();
connectDB();


const seedNGOs = async () => {
try {
await NGO.deleteMany();
await NGO.insertMany([
{ name: "Helping Hands", description: "Supports children education", verified: true },
{ name: "Green Earth", description: "Environmental conservation", verified: true }
]);
console.log("NGOs Seeded");
process.exit();
} catch (error) {
console.error(error);
process.exit(1);
}
};


seedNGOs();