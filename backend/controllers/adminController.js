import Admin from "../models/Admin.js";


export const getExpenditures = async (req, res) => {
try {
const admin = await Admin.findById(req.user.id);
res.json(admin.expenditures);
} catch (err) {
res.status(500).json({ message: err.message });
}
};