"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderModel = require('../models/orderModel');
const authModel = require('../models/authModel');
const router = express_1.default.Router();
router
    .route('/')
    .get(authModel.protect, orderModel.getAllOrders)
    .post(authModel.protect, orderModel.createOrder);
router
    .route('/:id')
    .get(authModel.protect, orderModel.getOrder)
    .put(authModel.protect, orderModel.updateOrder)
    .delete(authModel.protect, orderModel.deleteOrder);
router.route('/:id/products').post(authModel.protect, orderModel.addProducts);
module.exports = router;
