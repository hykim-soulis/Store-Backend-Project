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
        console.log(result.rows);
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
        throw new Error(`Cannot get all users ${err}`);
    }
};
// Return, console.log user_id
exports.createUser = async (req, res) => {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    try {
        const conn = await database_1.default.connect();
        const sql = `INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3)`;
        await conn.query(sql, [
            newUser.first_name,
            newUser.last_name,
            newUser.password,
        ]);
        conn.release();
        console.log(newUser);
        res.status(201).json({
            status: 'success',
            data: {
                newUser,
            },
        });
        return newUser;
    }
    catch (err) {
        res.status(400).json(err);
        throw new Error(`Cannot create a user ${err}`);
    }
};
exports.getUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        const conn = await database_1.default.connect();
        const sql = `SELECT * FROM users WHERE user_id=($1)`;
        const result = await conn.query(sql, [user_id]);
        const user = result.rows;
        conn.release();
        console.log(result.rows);
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
        throw new Error(`Cannot get a user ${err}`);
    }
};
exports.deleteUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        const conn = await database_1.default.connect();
        const sql = `DELETE FROM users WHERE user_id=($1)`;
        const result = await conn.query(sql, [user_id]);
        const deletedUser = result.rows;
        conn.release();
        console.log(deletedUser);
        res.status(204).json({
            status: 'success',
            data: {
                data: deletedUser,
            },
        });
        return deletedUser;
    }
    catch (err) {
        throw new Error(`Cannot delete the user(user_id: ${user_id}) ${err}`);
    }
};
