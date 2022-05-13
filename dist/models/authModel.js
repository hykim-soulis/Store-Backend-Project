"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signup = async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const conn = await database_1.default.connect();
        const sql = 'INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
        const hash = await bcrypt.hash(password, 10);
        const result = await conn.query(sql, [first_name, last_name, email, hash]);
        const user = result.rows[0];
        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        conn.release();
        res.status(200).json({
            status: 'success',
            token,
            data: { user },
        });
        return user;
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
};
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE email=($1)';
        const result = await conn.query(sql, [email]);
        const user = result.rows[0];
        const check = await bcrypt.compare(password, user.password_digest);
        if (check) {
            const token = jwt.sign({ user }, process.env.JWT_SECRET);
            res.status(200).json({
                status: 'success',
                token,
                data: { user },
            });
        }
        else {
            throw new Error('Invalid information');
        }
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
};
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = decoded.user;
    res.locals.user = currentUser;
    next();
};
