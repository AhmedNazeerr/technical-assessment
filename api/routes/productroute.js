const express = require('express');
const router = express.Router();
const{   createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct} = require('../controllers/productcontroller'); // Import the product controller

// Create a Product
router.post('/', createProduct);

// Retrieve All Products
router.get('/', getAllProducts);

// Retrieve a Single Product
router.get('/:id', getProductById);

// Update a Product
router.put('/:id', updateProduct);

// Delete a Product
router.delete('/:id', deleteProduct);

module.exports = router;
