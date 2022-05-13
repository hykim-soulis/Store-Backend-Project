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
    .post(authModel.protect, orderModel.createOrder)
    .put(authModel.protect, orderModel.updateOrder);
router.route('/:id').delete(authModel.protect, orderModel.deleteOrder);
module.exports = router;
