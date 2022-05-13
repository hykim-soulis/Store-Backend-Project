"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productModel = require('../models/productModel');
const top5populaRouter = express_1.default.Router();
top5populaRouter.route('/').get(productModel.getTop5Popular);
module.exports = top5populaRouter;
