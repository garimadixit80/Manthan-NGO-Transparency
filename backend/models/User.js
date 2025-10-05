import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
});

export default mongoose.model("User", userSchema);
