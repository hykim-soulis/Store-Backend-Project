import { Request, Response } from 'express';
import client from '../database';
exports.sum = (a: number, b: number): number => {
  return a + b;
};
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
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Cannot get all products ${err}`);
  }
};

// Return, console.log product_id
exports.createProduct = async (
  req: Request,
  res: Response
): Promise<Product> => {
  const newProduct: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const conn = await client.connect();
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
  } catch (err) {
    throw new Error(
      `Cannot delete the product(product_id: ${product_id}) ${err}`
    );
  }
};
