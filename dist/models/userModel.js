"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
exports.getAllUsers = async (_req, res) => {
    try {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users';
        const result = await conn.query(sql);
        const users = result.rows;
        conn.release();
        // console.log(result.rows);
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });
        return result.rows;
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
};
exports.getUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        const conn = await database_1.default.connect();
        const sql = `SELECT * FROM users WHERE user_id=($1)`;
        const result = await conn.query(sql, [user_id]);
        const user = result.rows[0];
        conn.release();
        // console.log(result.rows);
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
        return user;
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
};
exports.deleteMe = async (_req, res) => {
    try {
        const currentUser = res.locals.user;
        const user_id = currentUser.user_id;
        const conn = await database_1.default.connect();
        const sql = `DELETE FROM users WHERE user_id=($1)`;
        const result = await conn.query(sql, [user_id]);
        const deletedUser = result.rows[0];
        conn.release();
        res.status(204).json({
            status: 'success',
            data: {
                data: deletedUser,
            },
        });
        return deletedUser;
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
};
