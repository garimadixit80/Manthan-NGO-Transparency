import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("donations");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
