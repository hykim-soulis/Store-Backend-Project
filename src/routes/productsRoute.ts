import express from 'express';
const productModel = require('../models/productModel');

const router = express.Router();

router
  .route('/')
  .get(productModel.getAllProducts)
  .post(productModel.createProduct);
router
  .route('/:id')
  .get(productModel.getProduct)
  .delete(productModel.deleteProduct);
// router.route('/:id').put(productModel.updateProduct);

module.exports = router;
