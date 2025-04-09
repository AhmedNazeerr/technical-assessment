const Joi = require('joi');
const Product = require('../models/product');

// Validation schema using Joi
const productValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': '"name" should be a type of string',
    'string.min': '"name" should have a minimum length of 3 characters',
    'any.required': '"name" is required'
  }),
  price: Joi.number().positive().required().messages({
    'number.base': '"price" should be a type of number',
    'number.positive': '"price" should be a positive number',
    'any.required': '"price" is required'
  }),
  quantity: Joi.number().integer().min(0).required().messages({
    'number.base': '"quantity" should be a type of number',
    'number.integer': '"quantity" should be an integer',
    'number.min': '"quantity" should be at least 0',
    'any.required': '"quantity" is required'
  }),
  description: Joi.string().optional().messages({
    'string.base': '"description" should be a type of string'
  })
});

// Create a Product
const createProduct = async (req, res) => {
  try {
    // Validate request body
    const { error } = productValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, price, quantity, description } = req.body;
    const newProduct = new Product({ name, price, quantity, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Retrieve All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Retrieve a Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a Product
const updateProduct = async (req, res) => {
  try {
    // Validate request body
    const { error } = productValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, price, quantity, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity, description, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a Product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Export all functions at the end
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
