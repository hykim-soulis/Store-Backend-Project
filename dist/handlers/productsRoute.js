"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productModel = require('../models/productModel');
const authModel = require('../models/authModel');
const router = express_1.default.Router();
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
