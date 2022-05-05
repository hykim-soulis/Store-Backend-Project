"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel = require('../models/userModel');
const router = express_1.default.Router();
router.route('/').get(userModel.getAllProducts).post(userModel.createProduct);
router.route('/:id').get(userModel.getProduct).delete(userModel.deleteProduct);
// router.route('/:id').put(userModel.updateProduct);
module.exports = router;
