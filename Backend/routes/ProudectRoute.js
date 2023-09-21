const express = require("express");
const router = express.Router();
const productController = require("../controls/ProductControls");
const { isAuthenticatedUser, authorzieRoles } = require("../middlewair/auth");
const {
  createProductReview,
  getProductReviews,
  getDeleteReview,
} = require("../controls/UserControlers");

// POST /products - Create a new product
router.post(
  "/admin/products/new",
  isAuthenticatedUser,
  authorzieRoles("admin"),
  productController.createProduct
);

// GET /products - Get all products
router.get("/products", isAuthenticatedUser, productController.getAllproducts);

// PUT /products/:id - Update a product
router.put(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorzieRoles("admin"),
  productController.UpdateProduct
);

// DELETE /products/:id - Delete a product
router.delete(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorzieRoles("admin"),
  productController.deleteProduct
);

router.put("/review", isAuthenticatedUser, createProductReview);
// GET /products/:id - Get product details
router.get("/products/:id", productController.getProductDetails);

router.get("/reviews", getProductReviews);
router.delete("/reviews", isAuthenticatedUser, getDeleteReview);
module.exports = router;
