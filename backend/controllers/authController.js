import User from "../models/User.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// =======================
// USER SIGNUP
// =======================
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, "user"),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during user signup" });
  }
};

// =======================
// ADMIN SIGNUP
// =======================
export const registerAdmin = async (req, res) => {
  const { organization, email, password } = req.body;

  try {
    const exists = await Admin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      organization,
      email,
      password: hashedPassword,
    });

    res.json({
      _id: admin._id,
      name: admin.organization, // keep 'name' key consistent for frontend
      email: admin.email,
      token: generateToken(admin._id, "admin"),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during admin signup" });
  }
};

// =======================
// USER LOGIN
// =======================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, "user"),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during user login" });
  }
};

// =======================
// ADMIN LOGIN
// =======================
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: admin._id,
      name: admin.organization, // keep 'name' key consistent
      email: admin.email,
      token: generateToken(admin._id, "admin"),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during admin login" });
  }
};
