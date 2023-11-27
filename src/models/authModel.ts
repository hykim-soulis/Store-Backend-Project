import { Request, Response, NextFunction } from 'express';
import client from '../database';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Creates a new user account and generates an authentication token.
 *
 * @param {Request} req - The Express Request object containing user details in the request body.
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Object>} - The created user object and an authentication token.
 */
exports.signup = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const conn = await client.connect();
    const sql =
      'INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
    const hash = await bcrypt.hash(password, 10);
    const result = await conn.query(sql, [first_name, last_name, email, hash]);
    const user = result.rows[0];
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    conn.release();
    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    });
    return user;
  } catch (err) {
    res.status(400).json({
      status: 'error',
      errorMessage: 'Email already exists!',
    });
  }
};

/**
 * Logs in a user and generates an authentication token.
 *
 * @param {Request} req - The Express Request object containing user login details in the request body.
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Object>} - The authenticated user object and an authentication token.
 */
exports.login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE email=($1)';
    const result = await conn.query(sql, [email]);
    const user = result.rows[0];
    if (!user) {
      throw new Error('No user!');
    }
    const check = await bcrypt.compare(password, user.password_digest);
    if (check) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      res.status(200).json({
        status: 'success',
        token,
        data: { user },
      });
    } else {
      throw new Error('Invalid information');
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      errorMessage: 'Check your email or password again!',
    });
  }
};

/**
 * Middleware function to protect routes by verifying JWT token and setting the current user in res.locals.
 *
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {NextFunction} next - The Express NextFunction to proceed to the next middleware.
 */
exports.protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = decoded.user;
  res.locals.user = currentUser;
  next();
};
