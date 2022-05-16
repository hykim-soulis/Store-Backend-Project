import express from 'express';

const orderModel = require('../models/orderModel');
const authModel = require('../models/authModel');

const router = express.Router();

router
  .route('/')
  .get(authModel.protect, orderModel.getAllOrders)
  .post(authModel.protect, orderModel.createOrder);

router
  .route('/:id')
  .put(authModel.protect, orderModel.updateOrder)
  .delete(authModel.protect, orderModel.deleteOrder);

module.exports = router;
