import express from 'express';
const productModel = require('../models/productModel');
const authModel = require('../models/authModel');

const router = express.Router();

router
  .route('/')
  .get(productModel.getAllProducts)
  .post(authModel.protect, productModel.createProduct);

router
  .route('/:id')
  .get(productModel.getProduct)
  .delete(productModel.deleteProduct)
  .put(productModel.updateProduct);

module.exports = router;
