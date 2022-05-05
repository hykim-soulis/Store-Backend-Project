"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productModel = require('../models/productModel');
const router = express_1.default.Router();
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
