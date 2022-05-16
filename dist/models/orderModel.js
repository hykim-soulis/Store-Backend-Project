"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
exports.getAllOrders = async (req, res) => {
    const status = req.query.status;
    const currentUser = res.locals.user;
    const user_id = currentUser.user_id;
    try {
        let result;
        const conn = await database_1.default.connect();
        if (status) {
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status=($2)`;
            result = await conn.query(sql, [user_id, status]);
        }
        else {
            const sql = `SELECT * FROM orders WHERE user_id=($1)`;
            result = await conn.query(sql, [user_id]);
        }
        conn.release();
        res.status(200).json({
            status: 'success',
            results: result.rows.length,
            data: {
                orders: result.rows,
            },
        });
        return result.rows;
    }
    catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
};
exports.createOrder = async (req, res) => {
    const currentUser = res.locals.user;
    const user_id = currentUser.user_id;
    const { status } = req.body;
    try {
        const conn = await database_1.default.connect();
        const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *`;
        const result = await conn.query(sql, [status, user_id]);
        conn.release();
        res.status(201).json({
            status: 'success',
            data: {
                order: result.rows[0],
            },
        });
        return result.rows[0];
    }
    catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
};
exports.getOrder = async (req, res) => {
    const currentUser = res.locals.user;
    const user_id = currentUser.user_id;
    const order_id = req.params.id;
    try {
        const conn = await database_1.default.connect();
        const sql = `SELECT * FROM orders WHERE order_id=($1) AND user_id=($2)`;
        const result = await conn.query(sql, [order_id, user_id]);
        conn.release();
        // console.log(order);
        res.status(200).json({
            status: 'success',
            data: {
                order: result.rows[0],
            },
        });
        return result.rows[0];
    }
    catch (err) {
        res.status(400).json(err);
        throw new Error(`Cannot get an order ${err}`);
    }
};
exports.deleteOrder = async (req, res) => {
    const currentUser = res.locals.user;
    const user_id = currentUser.user_id;
    const order_id = req.params.id;
    try {
        const conn = await database_1.default.connect();
        const sql = `DELETE FROM orders WHERE order_id=($1) AND user_id=($2) RETURNING *`;
        const result = await conn.query(sql, [order_id, user_id]);
        const deletedOrder = result.rows[0];
        conn.release();
        res.status(204).json({
            status: 'success',
            data: null,
        });
        return deletedOrder;
    }
    catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
};
exports.updateOrder = async (req, res) => {
    const { status } = req.body;
    const order_id = req.params.id;
    const currentUser = res.locals.user;
    const user_id = currentUser.user_id;
    try {
        const conn = await database_1.default.connect();
        const sql = 'UPDATE orders SET status=($1) WHERE order_id=($2) AND user_id=($3) RETURNING *';
        const result = await conn.query(sql, [status, order_id, user_id]);
        conn.release();
        res.status(200).json({
            status: 'success',
            data: {
                order: result.rows[0],
            },
        });
        return result.rows[0];
    }
    catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
};
exports.addProducts = async (req, res) => {
    const order_id = req.params.id;
    const { quantity, product_id } = req.body;
    try {
        const conn = await database_1.default.connect();
        const sql = 'INSERT INTO order_products (quantity, product_id, order_id) VALUES ($1, $2, $3) RETURNING *';
        const result = await conn.query(sql, [quantity, product_id, order_id]);
        conn.release();
        res.status(201).json({
            status: 'success',
            data: {
                order: result.rows[0],
            },
        });
        return result.rows[0];
    }
    catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
};
