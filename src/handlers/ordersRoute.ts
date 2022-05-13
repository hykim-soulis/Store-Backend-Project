import express from 'express';

const orderModel = require('../models/orderModel');
const authModel = require('../models/authModel');

const router = express.Router();

router.route('/').post(authModel.protect, orderModel.createOrder);
router.route('/:id').get(orderModel.getOrder).delete(orderModel.deleteOrder);

module.exports = router;
