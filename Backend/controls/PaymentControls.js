/*const catchAsyncError = require("../middlewair/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    metadata: {
      company: "ChandanWebZon",
    },
  });

  res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
 

*/
const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      metadata: {
        company: "ChandanWebZon",
      },
    });

    res.status(200).json({ success: true, client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ success: false, error: "Payment processing failed" });
  }
};

exports.sendStripeApiKey = async (req, res) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch Stripe API key" });
  }
};
