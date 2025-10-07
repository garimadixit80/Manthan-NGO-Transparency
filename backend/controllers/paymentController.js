import Stripe from "stripe";
import Donation from "../models/Donation.js";
import User from "../models/User.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createCheckoutSession = async (req, res) => {
const { amount, userId, adminId } = req.body;
try {
const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
line_items: [
{
price_data: {
currency: "usd",
product_data: { name: "Donation" },
unit_amount: amount * 100,
},
quantity: 1,
},
],
mode: "payment",
success_url: `${process.env.FRONTEND_URL}/success`,
cancel_url: `${process.env.FRONTEND_URL}/cancel`,
});


const donation = await Donation.create({ user: userId, admin: adminId, amount });
await User.findByIdAndUpdate(userId, { $push: { donations: donation._id } });


res.json({ id: session.id });
} catch (err) {
res.status(500).json({ message: err.message });
}
};