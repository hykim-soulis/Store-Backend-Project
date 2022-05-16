import { Request, Response } from 'express';
import client from '../database';

type Product = {
  product_id?: Number;
  name: string;
  price: Number;
  category: string;
};

exports.getAllProducts = async (req: Request, res: Response) => {
  const category = req.query.category;
  try {
    let result;
    const conn = await client.connect();
    if (!category) {
      const sql = 'SELECT * FROM products';
      result = await conn.query(sql);
    } else {
      const sql = 'SELECT * FROM products WHERE category=($1)';
      result = await conn.query(sql, [category]);
    }
    conn.release();
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        products: result.rows,
      },
    });
    return result.rows;
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.getProduct = async (req: Request, res: Response) => {
  const product_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `SELECT * FROM products WHERE product_id=($1)`;
    const result = await conn.query(sql, [product_id]);
    conn.release();
    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.createProduct = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  try {
    const conn = await client.connect();
    const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *`;
    const result = await conn.query(sql, [name, price, category]);
    conn.release();
    res.status(201).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.updateProduct = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  const product_id = req.params.id;
  req.body;
  try {
    const conn = await client.connect();
    const sql =
      'UPDATE products SET name=($1), price=($2), category=($3) WHERE product_id=($4) RETURNING *';
    const result = await conn.query(sql, [name, price, category, product_id]);
    conn.release();
    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json(err);
    console.log;
  }
};

exports.deleteProduct = async (req: Request, res: Response) => {
  const product_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `DELETE FROM products WHERE product_id=($1) RETURNING *`;
    const result = await conn.query(sql, [product_id]);
    const deletedProduct = result.rows[0];
    conn.release();
    res.status(204).json({
      status: 'success',
      data: null,
    });
    return deletedProduct;
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.getTop5Popular = async (req: Request, res: Response) => {
  try {
    const conn = await client.connect();
    const sql = `
      SELECT 
        order_products.product_id,
        products.name,
        SUM(order_products.quantity) sales
      FROM
        order_products
      INNER JOIN products
      ON order_products.product_id = products.product_id
      GROUP BY order_products.product_id, products.name
      ORDER BY sales DESC
      LIMIT 5
      ;
    `;
    const result = await conn.query(sql);
    conn.release();
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        products: result.rows,
      },
    });
    return result.rows;
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
