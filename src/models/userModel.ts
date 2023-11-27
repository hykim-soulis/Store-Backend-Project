import { Request, Response } from 'express';
import client from '../database';

/**
 * Fetches a list of all users from the database.
 *
 * @param {Request} req - The Express Request object (unused in this function).
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Array>} - An array of user objects returned from the database.
 */
exports.getAllUsers = async (_req: Request, res: Response) => {
  try {
    const conn = await client.connect();
    // Retrieve all users
    const sql = 'SELECT * FROM users';
    const result = await conn.query(sql);
    const users = result.rows;
    conn.release();
    // Send the list of all users in the response
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
    // Return the array of user objects for potential further use
    return users;
  } catch (err) {
    // Handle errors by sending an appropriate error response and logging the error
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred',
    });
    console.log(err);
  }
};

/**
 * Retrieves a single user based on the provided user ID.
 *
 * @param {Request} req - The Express Request object containing route parameters.
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Object|null>} - A single user object returned from the database, or null if not found.
 */
exports.getUser = async (req: Request, res: Response) => {
  const user_id = req.params.id;
  try {
    const conn = await client.connect();
    // Query to retrieve the user based on the provided user_id
    const sql = `SELECT * FROM users WHERE user_id=($1)`;
    const result = await conn.query(sql, [user_id]);
    const user = result.rows[0];
    conn.release();
    // Send the retrieved user in the response
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
    // Return the retrieved user object for potential further use
    return user;
  } catch (err) {
    /// Handle errors by sending an appropriate error response
    res.status(400).json({ status: 'fail', message: err });
    console.log(err);
  }
};

/**
 * Deletes the currently authenticated user from the database.
 *
 * @param {Request} _req - The Express Request object (unused in this function).
 * @param {Response} res - The Express Response object to send the server response.
 * @returns {Promise<Object|null>} - The deleted user object, or null in case of an error.
 */
exports.deleteMe = async (_req: Request, res: Response) => {
  try {
    // Retrieve the currently authenticated user from res.locals
    const currentUser = res.locals.user;
    const user_id = currentUser.user_id;
    const conn = await client.connect();
    // Delete the user based on the provided user_id
    const sql = `DELETE FROM users WHERE user_id=($1)`;
    const result = await conn.query(sql, [user_id]);
    const deletedUser = result.rows[0];
    conn.release();
    // Send a success response indicating the deletion
    res.status(204).json({
      status: 'success',
      data: {
        data: deletedUser,
      },
    });
    // Return the deleted user object for potential further use
    return deletedUser;
  } catch (err) {
    // Handle errors by sending an appropriate error response and logging the error
    res.status(400).json(err);
    console.log(err);
  }
};
