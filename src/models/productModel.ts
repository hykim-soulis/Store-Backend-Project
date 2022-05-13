import { Request, Response } from 'express';
import client from '../database';

type Product = {
  product_id?: Number;
  name: string;
  price: Number;
  category: string;
};

exports.getAllProducts = async (
  _req: Request,
  res: Response
): Promise<Product[]> => {
  try {
    const conn = await client.connect();
    const sql = 'SELECT * FROM products';
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
    res.status(400).json(err);
    throw new Error(`Cannot get all products ${err}`);
  }
};

exports.createProduct = async (
  req: Request,
  res: Response
): Promise<Product> => {
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
    res.status(400).json(err);
    throw new Error(`Cannot create a product ${err}`);
  }
};

exports.getProduct = async (
  req: Request,
  res: Response
): Promise<Product[]> => {
  const product_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `SELECT * FROM products WHERE product_id=($1)`;
    const result = await conn.query(sql, [product_id]);
    conn.release();
    // console.log(product);
    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Cannot get a product ${err}`);
  }
};

exports.deleteProduct = async (
  req: Request,
  res: Response
): Promise<Product[]> => {
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
    throw new Error(
      `Cannot delete the product(product_id: ${product_id}) ${err}`
    );
  }
};

exports.updateProduct = async (
  req: Request,
  res: Response
): Promise<Product[]> => {
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
    throw new Error(
      `Cannot update the product(product_id: ${product_id}) ${err}`
    );
  }
};
