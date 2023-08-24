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
  .get(authModel.protect, orderModel.getOrder)
  .put(authModel.protect, orderModel.updateOrder)
  .delete(authModel.protect, orderModel.deleteOrder);

router
  .route('/status/:status')
  .get(authModel.protect, orderModel.getOrderByStatus);

router.route('/cart').get(authModel.protect, orderModel.getCart);

router
  .route('/:id/products')
  .get(authModel.protect, orderModel.getAllOrderProducts)
  .post(authModel.protect, orderModel.addOrderProduct);

router
  .route('/:id/checkout-session')
  .post(authModel.protect, orderModel.getCheckoutSession);

router
  .route('/:order_id/products/:product_id')
  .get(authModel.protect, orderModel.getOrderProductsByProductId)
  .put(authModel.protect, orderModel.updateOrderProduct)
  .delete(authModel.protect, orderModel.deleteOrderProduct);

module.exports = router;
