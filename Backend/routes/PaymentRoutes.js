const express = require("express");
const router = express.Router();
const  paymentController = require("../controls/PaymentControls");
const { isAuthenticatedUser } = require("../middlewair/auth");

router.post( 
  "/payment/process",
  isAuthenticatedUser,
  paymentController.processPayment
);

router.get(
  "/stripeapikey",
  isAuthenticatedUser,
  paymentController.sendStripeApiKey
);

module.exports = router;
