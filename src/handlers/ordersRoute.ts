import express from 'express';

const orderModel = require('../models/orderModel');
const authModel = require('../models/authModel');

const router = express.Router();

router
  .route('/')
  .get(authModel.protect, orderModel.getAllOrders)
  .post(authModel.protect, orderModel.createOrder)
  .put(authModel.protect, orderModel.updateOrder);
router.route('/:id').delete(authModel.protect, orderModel.deleteOrder);

module.exports = router;
