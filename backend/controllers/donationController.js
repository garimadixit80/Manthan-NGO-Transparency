import Donation from "../models/Donation.js";

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("user").populate("admin");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
