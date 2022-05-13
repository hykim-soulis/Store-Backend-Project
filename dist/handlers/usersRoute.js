"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel = require('../models/userModel');
const authModel = require('../models/authModel');
const router = express_1.default.Router();
router
    .route('/')
    .get(authModel.protect, userModel.getAllUsers)
    .delete(authModel.protect, userModel.deleteMe);
router.route('/:id').get(authModel.protect, userModel.getUser);
router.route('/signup').post(authModel.signup);
router.route('/login').post(authModel.login);
module.exports = router;
// delete user needs to be changed to delete myself
