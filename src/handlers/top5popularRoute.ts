import express from 'express';
const productModel = require('../models/productModel');

const top5populaRouter = express.Router();
top5populaRouter.route('/').get(productModel.getTop5Popular);

module.exports = top5populaRouter;
