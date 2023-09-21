const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetils,
  updatePassword,
  updateProfile,
  getSingleUser,
  getAllUser,
  updateUserRole,
  deleteUser,
} = require("../controls/UserControlers");
const { isAuthenticatedUser, authorzieRoles } = require("../middlewair/auth");
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetils);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorzieRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorzieRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorzieRoles("admin"), deleteUser);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorzieRoles("admin"), getAllUser);

module.exports = router;
