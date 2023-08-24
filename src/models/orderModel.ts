import { Request, Response } from 'express';
import client from '../database';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// type Order = {
//   order_id: Number;
//   product_id: Number;
//   quantity: number;
//   user_id: Number;
//   status: string;
// };

exports.getCheckoutSession = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [...req.body.items].map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${req.protocol}://localhost:4200/order-confirm`,
      cancel_url: `${req.protocol}://localhost:4200/cart`,
    });
    res.status(200).json({
      status: 'success',
      url: session.url,
    });
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.getAllOrders = async (req: Request, res: Response) => {
  const status = req.query.status;
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;

  try {
    let result;
    const conn = await client.connect();
    if (status) {
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status=($2)`;
      result = await conn.query(sql, [user_id, status]);
    } else {
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
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.createOrder = async (req: Request, res: Response) => {
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;
  const { status } = req.body;
  try {
    const conn = await client.connect();
    const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *`;
    const result = await conn.query(sql, [status, user_id]);
    conn.release();
    res.status(201).json({
      status: 'success',
      data: {
        order: result.rows,
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.getOrder = async (req: Request, res: Response) => {
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;
  const order_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `SELECT * FROM orders WHERE order_id=($1) AND user_id=($2)`;
    const result = await conn.query(sql, [order_id, user_id]);
    conn.release();
    res.status(200).json({
      status: 'success',
      data: {
        order: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Cannot get an order ${err}`);
  }
};

exports.getOrderByStatus = async (req: Request, res: Response) => {
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;
  const status = req.params.status;
  try {
    const conn = await client.connect();
    const sql = `SELECT * FROM orders WHERE user_id=($1) AND status=($2)`;
    const result = await conn.query(sql, [user_id, status]);
    conn.release();
    res.status(200).json({
      status: 'success',
      data: {
        order: result.rows,
      },
    });
    return result.rows;
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Cannot get an order ${err}`);
  }
};

exports.updateOrder = async (req: Request, res: Response) => {
  const { status } = req.body;
  const order_id = req.params.id;
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;
  try {
    const conn = await client.connect();
    const sql =
      'UPDATE orders SET status=($1) WHERE order_id=($2) AND user_id=($3) RETURNING *';
    const result = await conn.query(sql, [status, order_id, user_id]);
    conn.release();
    res.status(200).json({
      status: 'success',
      data: {
        order: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.deleteOrder = async (req: Request, res: Response) => {
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;
  const order_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `DELETE FROM orders WHERE order_id=($1) AND user_id=($2) RETURNING *`;
    const result = await conn.query(sql, [order_id, user_id]);
    const deletedOrder = result.rows[0];
    conn.release();
    res.status(204).json({
      status: 'success',
      data: null,
    });
    return deletedOrder;
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.getAllOrderProducts = async (req: Request, res: Response) => {
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;
  const order_id = req.params.id;

  try {
    let result;
    const conn = await client.connect();
    const sql = `SELECT * FROM order_products NATURAL JOIN products WHERE order_id=($1)`;
    result = await conn.query(sql, [order_id]);
    conn.release();
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        orders: result.rows,
      },
    });
    return result.rows;
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.getOrderProductsByProductId = async (req: Request, res: Response) => {
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;
  const order_id = req.params.order_id;
  const product_id = req.params.product_id;

  try {
    let result;
    const conn = await client.connect();
    const sql = `SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2)`;
    result = await conn.query(sql, [order_id, product_id]);
    conn.release();
    res.status(200).json({
      status: 'success',
      data: {
        order: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json({ err: 'error here 💣' });
    console.error(err);
  }
};

exports.addOrderProduct = async (req: Request, res: Response) => {
  const order_id = req.params.id;

  const { quantity, product_id } = req.body;
  try {
    const conn = await client.connect();
    const sql =
      'INSERT INTO order_products (quantity, product_id, order_id) VALUES ($1, $2, $3) RETURNING *';
    const result = await conn.query(sql, [quantity, product_id, order_id]);
    conn.release();
    res.status(201).json({
      status: 'success',
      data: {
        order: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.updateOrderProduct = async (req: Request, res: Response) => {
  const { quantity } = req.body;
  const order_id = req.params.order_id;
  const product_id = req.params.product_id;
  try {
    const conn = await client.connect();
    const sql =
      'UPDATE order_products SET quantity=($1) WHERE product_id=($2) AND order_id=($3) RETURNING *';
    const result = await conn.query(sql, [quantity, product_id, order_id]);
    conn.release();
    res.status(200).json({
      status: 'success',
      data: {
        order: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.deleteOrderProduct = async (req: Request, res: Response) => {
  const { order_id, product_id } = req.params;
  try {
    const conn = await client.connect();
    const sql =
      'DELETE FROM order_products WHERE product_id = ($1) AND order_id = ($2)';
    const result = await conn.query(sql, [product_id, order_id]);
    conn.release();
    res.status(201).json({
      status: 'success',
      data: {
        order: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

exports.getCart = async (req: Request, res: Response) => {
  const order_id = req.params;
  try {
    let result;
    const conn = await client.connect();
    const sql = `SELECT * FROM order_products WHERE AND order_id=($1)`;
    result = await conn.query(sql, [order_id]);
    conn.release();
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        orders: result.rows,
      },
    });
    return result.rows;
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};
