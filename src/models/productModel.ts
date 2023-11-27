import { Request, Response } from 'express';
import client from '../database';

/**
 * Fetches a list of products based on the specified category or returns all products.
 *
 * @param {Request} req - The Express Request object containing query parameters.
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Array>} - An array of product objects returned from the database.
 */
exports.getAllProducts = async (req: Request, res: Response) => {
  const category = req.query.category;
  try {
    let result;
    const conn = await client.connect();
    // If no category specified or 'All' selected, retrieve all products
    if (!category || category === 'All') {
      const sql = 'SELECT * FROM products';
      result = await conn.query(sql);
    } else {
      // Retrieve products filtered by the specified category
      const sql = 'SELECT * FROM products WHERE category=($1)';
      result = await conn.query(sql, [category]);
    }
    conn.release();
    // Send the list of products in the response
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        products: result.rows,
      },
    });
    // Return the array of product objects for potential further use
    return result.rows;
  } catch (err) {
    // Handle errors by sending an appropriate error response
    res.status(404).json({ status: 'fail', message: err });
  }
};

/**
 * Retrieves a single product based on the provided product ID.
 *
 * @param {Request} req - The Express Request object containing route parameters.
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Object|null>} - A single product object returned from the database, or null if not found.
 */
exports.getProduct = async (req: Request, res: Response) => {
  const product_id = req.params.id;
  try {
    const conn = await client.connect();
    // Query to retrieve the product based on the provided product_id
    const sql = `SELECT * FROM products WHERE product_id=($1)`;
    const result = await conn.query(sql, [product_id]);
    conn.release();
    // Send the retrieved product in the response
    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
    // Return the retrieved product object for potential further use
    return result.rows[0];
  } catch (err) {
    // Handle errors by sending an appropriate error response
    res.status(404).json({ status: 'fail', message: err });
  }
};

/**
 * Creates a new product based on the provided data.
 *
 * @param {Request} req - The Express Request object containing the new product's data in the request body.
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Object|null>} - The newly created product object returned from the database, or null in case of an error.
 */
exports.createProduct = async (req: Request, res: Response) => {
  const { name, price, category, img_url, description } = req.body;
  try {
    const conn = await client.connect();
    // Insert a new product record into the database
    const sql = `INSERT INTO products (name, price, category, img_url, description) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const result = await conn.query(sql, [
      name,
      price,
      category,
      img_url,
      description,
    ]);
    conn.release();
    // Send the newly created product in the response
    res.status(201).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
    // Return the newly created product object for potential further use
    return result.rows[0];
  } catch (err) {
    // Handle errors by sending an appropriate error response
    res
      .status(500)
      .json({ status: 'error', message: 'An internal server error occurred' });
  }
};

/**
 * Updates an existing product based on the provided data and product ID.
 *
 * @param {Request} req - The Express Request object containing the updated product's data in the request body and the product ID in the route parameters.
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Object|null>} - The updated product object returned from the database, or null in case of an error.
 */
exports.updateProduct = async (req: Request, res: Response) => {
  const { name, price, category, img_url, description } = req.body;
  const product_id = req.params.id;

  try {
    const conn = await client.connect();
    // Update the product based on the provided product_id
    const sql =
      'UPDATE products SET name=($1), price=($2), category=($3), img_url=($4), description=($5) WHERE product_id=($6) RETURNING *';
    const result = await conn.query(sql, [
      name,
      price,
      category,
      img_url,
      description,
      product_id,
    ]);
    conn.release();
    // Send the updated product in the response
    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
    // Return the updated product object for potential further use
    return result.rows[0];
  } catch (err) {
    // Handle errors by sending an appropriate error response
    res
      .status(500)
      .json({ status: 'error', message: 'An internal server error occurred' });
  }
};

/**
 * Deletes an existing product based on the provided product ID.
 *
 * @param {Request} req - The Express Request object containing the product ID in the route parameters.
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Object|null>} - The deleted product object returned from the database, or null in case of an error.
 */
exports.deleteProduct = async (req: Request, res: Response) => {
  const product_id = req.params.id;
  try {
    const conn = await client.connect();
    // Delete the product based on the provided product_id and return the deleted product
    const sql = `DELETE FROM products WHERE product_id=($1) RETURNING *`;
    const result = await conn.query(sql, [product_id]);
    const deletedProduct = result.rows[0];
    conn.release();
    // Send a success response indicating the deletion
    res.status(204).json({
      status: 'success',
      data: null,
    });
    // Return the deleted product object for potential further use
    return deletedProduct;
  } catch (err) {
    // Handle errors by sending an appropriate error response and logging the error
    res.status(400).json({
      status: 'error',
      message: 'An internal server error occurred',
    });
  }
};

/**
 * Retrieves the top 5 most popular products based on their sales quantity.
 *
 * @param {Request} _req - The Express Request object (unused in this function).
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Array>} - An array of the top 5 most popular product objects based on sales quantity.
 */
exports.getTop5Popular = async (_req: Request, res: Response) => {
  try {
    const conn = await client.connect();
    // Query to retrieve the top 5 most popular products based on sales quantity
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
    // Return the array of top 5 most popular product objects for potential further use
    return result.rows;
  } catch (err) {
    // Handle errors by sending an appropriate error response
    res.status(404).json({
      status: 'error',
      message: 'An internal server error occurred',
    });
  }
};
