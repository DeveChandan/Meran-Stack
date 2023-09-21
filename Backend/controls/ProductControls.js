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

const getAllproducts = async (req, res) => {
  const resultPerPage = 8;
  const { page = 1, keyword = '', minPrice = 0, maxPrice = Infinity, category = '', minReviews = 0,maxReviews=5 } = req.query;

  try {
    const parsedPage = parseInt(page);
    if (isNaN(parsedPage) || parsedPage <= 0) {
      throw new Error('Invalid page value');
    }

    // Filter conditions
    const filter = {
      name: { $regex: keyword, $options: 'i' },
      price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) },
    };
    if (category !== '') {
      filter.category = category; 
    }
    if (minReviews > 0 || maxReviews < 5) {
      filter.reviews = { $gte: parseInt(minReviews), $lte: parseInt(maxReviews) };
    }


    const countPromise = Product.countDocuments(filter).exec();

    const productsPromise = Product.find(filter)
      .limit(resultPerPage)
      .skip((parsedPage - 1) * resultPerPage)
      .exec();

    const [count, products] = await Promise.all([countPromise, productsPromise]);
    const totalPages = Math.ceil(count / resultPerPage);

    res.status(200).json({
      success: true,
      products,
      productCount: count,
      resultPerPage,
      currentPage: parsedPage,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message,
    });
  }
};



/*const getAllproducts = async (req, res) => {
  const resultPerPage = req.query.resultPerPage ? parseInt(req.query.resultPerPage) : 7;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  try {
    const productCount = await Product.countDocuments();
    const features = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate(resultPerPage);

    const products = await features.query;

    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
      currentPage: page,
      totalPages: Math.ceil(productCount / resultPerPage),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
    });  
  }
};*/

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


const UpdateProduct = catchAsyncError(async (req, res, next) => {
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
