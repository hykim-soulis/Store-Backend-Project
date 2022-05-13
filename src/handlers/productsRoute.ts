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
  .put(authModel.protect, productModel.updateProduct)
  .delete(authModel.protect, productModel.deleteProduct);

module.exports = router;
