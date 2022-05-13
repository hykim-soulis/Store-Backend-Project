import express from 'express';
const userModel = require('../models/userModel');
const authModel = require('../models/authModel');

const router = express.Router();

router
  .route('/')
  .get(authModel.protect, userModel.getAllUsers)
  .delete(authModel.protect, userModel.deleteMe);

router.route('/:id').get(authModel.protect, userModel.getUser);
router.route('/signup').post(authModel.signup);
router.route('/login').post(authModel.login);

module.exports = router;

// delete user needs to be changed to delete myself
