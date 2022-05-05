"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
exports.sum = (a, b) => {
    return a + b;
};
exports.getAllProducts = async (_req, res) => {
    try {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM products';
        const result = await conn.query(sql);
        const products = result.rows;
        conn.release();
        // console.log(products);
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products,
            },
        });
        return products;
    }
    catch (err) {
        res.status(400).json(err);
        throw new Error(`Cannot get all products ${err}`);
    }
};
// Return, console.log product_id
exports.createProduct = async (req, res) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const conn = await database_1.default.connect();
        const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3)`;
        await conn.query(sql, [
            newProduct.name,
            newProduct.price,
            newProduct.category,
        ]);
        conn.release();
        console.log(newProduct);
        res.status(201).json({
            status: 'success',
            data: {
                newProduct,
            },
        });
        return newProduct;
    }
    catch (err) {
        res.status(400).json(err);
        throw new Error(`Cannot create a product ${err}`);
    }
};
exports.getProduct = async (req, res) => {
    const product_id = req.params.id;
    try {
        const conn = await database_1.default.connect();
        const sql = `SELECT * FROM products WHERE product_id=($1)`;
        const result = await conn.query(sql, [product_id]);
        const product = result.rows;
        conn.release();
        // console.log(product);
        res.status(200).json({
            status: 'success',
            data: {
                product,
            },
        });
        return product;
    }
    catch (err) {
        res.status(400).json(err);
        throw new Error(`Cannot get a product ${err}`);
    }
};
exports.deleteProduct = async (req, res) => {
    const product_id = req.params.id;
    try {
        const conn = await database_1.default.connect();
        const sql = `DELETE FROM products WHERE product_id=($1)`;
        const result = await conn.query(sql, [product_id]);
        const deletedProduct = result.rows;
        conn.release();
        console.log(deletedProduct);
        res.status(204).json({
            status: 'success',
            data: {
                data: deletedProduct,
            },
        });
        return deletedProduct;
    }
    catch (err) {
        throw new Error(`Cannot delete the product(product_id: ${product_id}) ${err}`);
    }
};
