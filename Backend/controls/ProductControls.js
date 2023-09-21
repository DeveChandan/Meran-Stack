const catchAsyncError = require("../middlewair/catchAsyncError");
const Product = require("../model/ProductModel");
const APIFeatures = require("../utils/apifeatures");
const handleErrors = require("../utils/errorhanding");

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

const getAllproducts = catchAsyncError(async (req, res) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const products = await features.query;

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
});

//getProductDetails
const getProductDetails = catchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return next(new handleErrors("Product Not Found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product details",
      error: error.message,
    });
  }
});

//UpdateProduct

/*const UpdateProduct = catchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // Update the product with the new data
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    // ...

    const updatedProduct = await product.save();
      
    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Custom error message for validation errors
      const errorMessage = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errorMessage,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
});
*/
const UpdateProduct = catchAsyncError(async (req, res,next) => {
  try {
    let product = await Product.findById(req.params.id); // Corrected variable name

    if (!product) {
      return next(new handleErrors("Product Not Found", 404));
    }

    // Update the product with the new data
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    // ...

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
});


//Delete Product
const deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id; // Assuming the product ID is passed as a URL parameter

  try {
    // Find the product by ID and remove it
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deleteProduct) {
      return next(new handleErrors("Product Not Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
});
module.exports = {
  createProduct,
  getAllproducts,
  UpdateProduct,
  deleteProduct,
  getProductDetails,
};
