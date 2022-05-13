import { Request, Response } from 'express';
import client from '../database';

type Order = {
  order_id: Number;
  product_id: Number;
  quantity: number;
  user_id: Number;
  status: string;
};

exports.getAllOrders = async (
  _req: Request,
  res: Response
): Promise<Order[]> => {
  try {
    const conn = await client.connect();
    const sql = 'SELECT * FROM orders';
    const result = await conn.query(sql);
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
    throw new Error(`Cannot get all orders ${err}`);
  }
};

exports.createOrder = async (req: Request, res: Response): Promise<Order> => {
  const currentUser = res.locals.user;
  const user_id = currentUser.user_id;
  console.log(currentUser);
  const { product_id, quantity, status } = req.body;
  // console.log(product_id, quantity, user_id, status);
  try {
    const conn = await client.connect();
    const sql = `INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await conn.query(sql, [
      product_id,
      quantity,
      user_id,
      status,
    ]);
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
    throw new Error(`Cannot create an order ${err}`);
  }
};

exports.getOrder = async (req: Request, res: Response): Promise<Order[]> => {
  const order_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `SELECT * FROM orders WHERE order_id=($1)`;
    const result = await conn.query(sql, [order_id]);
    conn.release();
    // console.log(order);
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

exports.deleteOrder = async (req: Request, res: Response): Promise<Order[]> => {
  const order_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `DELETE FROM orders WHERE order_id=($1) RETURNING *`;
    const result = await conn.query(sql, [order_id]);
    const deletedOrder = result.rows[0];
    conn.release();
    res.status(204).json({
      status: 'success',
      data: null,
    });
    return deletedOrder;
  } catch (err) {
    throw new Error(`Cannot delete the order(order_id: ${order_id}) ${err}`);
  }
};

exports.updateOrder = async (req: Request, res: Response): Promise<Order[]> => {
  const { product_id, quantity, user_id, status } = req.body;
  const order_id = req.params.id;
  req.body;
  try {
    const conn = await client.connect();
    const sql =
      'UPDATE orders SET product_id=($1), quantity=($2), user_id=($3), status=($4) WHERE order_id=($5) RETURNING *';
    const result = await conn.query(sql, [
      product_id,
      quantity,
      user_id,
      status,
      order_id,
    ]);
    conn.release();
    res.status(200).json({
      status: 'success',
      data: {
        order: result.rows[0],
      },
    });
    return result.rows[0];
  } catch (err) {
    throw new Error(`Cannot update the order(order_id: ${order_id}) ${err}`);
  }
};
