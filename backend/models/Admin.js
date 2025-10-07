import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
organization: { type: String, required: true },
email: { type: String, unique: true, required: true },
password: { type: String, required: true },
expenditures: [
{
category: String,
percentage: Number,
amount: Number,
},
],
});


export default mongoose.model("Admin", adminSchema);
