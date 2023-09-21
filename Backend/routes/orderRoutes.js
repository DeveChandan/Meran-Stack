const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorzieRoles } = require("../middlewair/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrder,
  UpdateOrder,
  deleteOrder,
} = require("../controls/orderControls");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorzieRoles("admin"), getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorzieRoles("admin"), getAllOrder);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorzieRoles("admin"), UpdateOrder);
  router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authorzieRoles("admin"), deleteOrder);
 
module.exports = router;
