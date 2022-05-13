import { Request, Response } from 'express';
import client from '../database';

export type User = {
  user_id?: Number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

exports.getAllUsers = async (_req: Request, res: Response): Promise<User[]> => {
  try {
    const conn = await client.connect();
    const sql = 'SELECT * FROM users';
    const result = await conn.query(sql);
    const users = result.rows;
    conn.release();
    console.log(result.rows);
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
    return result.rows;
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Cannot get all users ${err}`);
  }
};

// // Return, console.log user_id
// exports.createUser = async (req: Request, res: Response): Promise<User> => {
//   const newUser: User = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     password: req.body.password,
//   };
//   try {
//     const conn = await client.connect();
//     const sql = `INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3)`;
//     const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

//     const result = await conn.query(sql, [
//       newUser.first_name,
//       newUser.last_name,
//       hash,
//     ]);
//     conn.release();
//     console.log(result.rows[0]);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         newUser,
//       },
//     });
//     return newUser;
//   } catch (err) {
//     res.status(400).json(err);
//     throw new Error(`Cannot create a user ${err}`);
//   }
// };

exports.getUser = async (req: Request, res: Response): Promise<User[]> => {
  const user_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `SELECT * FROM users WHERE user_id=($1)`;
    const result = await conn.query(sql, [user_id]);
    const user = result.rows;
    conn.release();
    console.log(result.rows);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
    return user;
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Cannot get a user ${err}`);
  }
};

exports.deleteUser = async (req: Request, res: Response): Promise<User[]> => {
  const user_id = req.params.id;
  try {
    const conn = await client.connect();
    const sql = `DELETE FROM users WHERE user_id=($1)`;
    const result = await conn.query(sql, [user_id]);
    const deletedUser = result.rows;
    conn.release();
    console.log(deletedUser);
    res.status(204).json({
      status: 'success',
      data: {
        data: deletedUser,
      },
    });
    return deletedUser;
  } catch (err) {
    throw new Error(`Cannot delete the user(user_id: ${user_id}) ${err}`);
  }
};

// exports.authenticate=async(username: string, password: string): Promise<User | null> {
//   const conn = await client.connect()
//   const sql = 'SELECT password_digest FROM users WHERE username=($1)'
//   const result = await conn.query(sql, [username])
//   console.log(password+pepper)

//   if(result.rows.length) {
//     const user = result.rows[0]
//     console.log(user)
//     if (bcrypt.compareSync(password+pepper, user.password_digest)) {
//       return user
//     }
//   }
//   return null
// }
