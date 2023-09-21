const { now } = require("mongoose");
const catchAsyncError = require("../middlewair/catchAsyncError");
const User = require("../model/userModel");
const handleErrors = require("../utils/errorhanding");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Product = require("../model/ProductModel");
const cloudinary=require('cloudinary')
const validator = require("validator");
exports.registerUser = catchAsyncError(async (req, res, next) => {

  myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
folder:"avatars",
width:150,
crop:"scale",
  })
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url:myCloud.secure_url,
    },
  });
sendToken(user,201,res)
});
//LoginUser
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if the user provided both email and password
  if (!email || !password) {
    return next(new handleErrors("Please enter both email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new handleErrors("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePasswords(password);
  if (!isPasswordMatched) {
    return next(new handleErrors("Invalid email or password", 401));
  }
  sendToken(user,200,res)
});

//User Logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
//Forgot Password
// Function to generate reset token
const generateResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Set expiration time to 15 minutes
  return resetToken;
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if the email is provided and is a valid email address
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If user not found, return error response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token and save the user
    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    // Compose the reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    // Compose the email message
    const message = `To reset your password, please click on the link below:\n\n${resetPasswordUrl}\n\nIf you did not request this password reset, you can ignore this email.`;

    // Send the email
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}; 
// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    // Find the user by the reset token and check the expiration time
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Reset password token has expired or is invalid',
      });
    }

    // Update the user's password and clear the reset token
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// ... other user-related controller functions ...

//Get user detils
/*exports.getUserDetils = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};*/
exports.getUserDetils = async (req, res, next) => {
  try {
   // const { id } = ;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user, 
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//updatePassword
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePasswords(req.body.oldPassword);
  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Old Password is incorrect",
    });
  }
  if (req.body.newPassword === req.body.oldPassword) {
    return res.status(400).json({
      success: false,
      message: "New Password should be different from the Old Password",
    });
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});
//update User profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all Users
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
//get single User (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new handleErrors(`User dose not exit with id:${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Get user role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get Delelt user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(
        new handleErrors(`User not found with id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(new handleErrors("Failed to delete user", 500, error.message));
  }
};
//create Reviews
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (!product.reviews) {
    product.reviews = [];
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user && rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Update existing review
    product.reviews.forEach((rev) => {
      if (rev.user && rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    // Add new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
//get all review all product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new handleErrors("product Not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
//Get delete review
exports.getDeleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new handleErrors("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0; 
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
