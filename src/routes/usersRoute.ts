import express from 'express';
const userModel = require('../models/userModel');

const router = express.Router();

router.route('/').get(userModel.getAllProducts).post(userModel.createProduct);
router.route('/:id').get(userModel.getProduct).delete(userModel.deleteProduct);
// router.route('/:id').put(userModel.updateProduct);

module.exports = router;
