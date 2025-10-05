import User from "../models/User.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// User Signup
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, "user"),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Signup
export const registerAdmin = async (req, res) => {
  const { organization, email, password } = req.body;
  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ organization, email, password: hashedPassword });

    res.json({
      _id: admin._id,
      organization: admin.organization,
      email: admin.email,
      token: generateToken(admin._id, "admin"),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
