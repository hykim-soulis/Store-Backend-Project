import express from 'express';
const userModel = require('../models/userModel');
const authModel = require('../models/authModel');

const router = express.Router();

// router.route('/').get(userModel.getAllUsers).post(userModel.createUser);
// router.route('/:id').get(userModel.getUser).delete(userModel.deleteUser);
// router.route('/:id').put(userModel.updateProduct);
router.route('/').get(userModel.getAllUsers);
router.route('/:id').get(userModel.getUser).delete(userModel.deleteUser);
router.route('/signup').post(authModel.signup);
router.route('/login').post(authModel.login);

module.exports = router;
