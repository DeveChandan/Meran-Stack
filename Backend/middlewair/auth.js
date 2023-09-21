
/*const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const handleErrors = require("../utils/errorhanding");
const User = require("../model/userModel");
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.JWT_SECRET)
console.log(process.env.JWT_SECRET)

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token)
  if (!token) {
    return next(new handleErrors("Please log in to access this resource", 401));

  }

  //try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(process.env.JWT_SECRET)
  
    req.user = await User.findById(decoded.id);
    next();
  /*} catch (error) {
    return next(new handleErrors("Invalid token", 401));


});  
exports.authorzieRoles = (...roles) => {  
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new handleErrors(
          `Role:${req.user.role}is not to access this resouce`,
          403
        )
      );
    }
    next();
  };
};
*/
const dotenv = require('dotenv');
dotenv.config();
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const handleErrors = require("../utils/errorhanding");
const User = require("../model/userModel");


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ success: false, message: "Please log in to access this resource" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log information inside the asynchronous function
    console.log("Token verified successfully");
    console.log("User ID from token:", decoded.id);

    // Fetch user data from the database
    const user = await User.findById(decoded.id);

    // Log user data
    console.log("User data:", user);

    // Attach user data to the request object
    req.user = user;
    console.log("hello");
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
});

/*
console.log(process.env.JWT_SECRET)
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Please log in to access this resource" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    console.log("User ID from Token:", userId);

    const user = await User.findById(userId);

    console.log("User from Database:", user);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
});
*/
exports.authorzieRoles = (...roles) => {  
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new handleErrors(
          `Role:${req.user.role}is not to access this resouce`,
          403
        )
      );
    }
    next();
  };
};