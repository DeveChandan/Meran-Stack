
const catchAsyncError = require("../middlewair/catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Please log in to access this resource" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
});

exports.authorzieRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Role: ${req.user.role} is not allowed to access this resource` });
    }
    next();
  };
};





/*const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const handleErrors = require("../utils/errorhanding");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(handleErrors("Please log in to access this resource", 401));

  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(handleErrors("Invalid token", 401));

  }
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
};*/
