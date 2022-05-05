import client from '../database';

export type Product = {
  product_id: Number;
  name: string;
  price: Number;
  category: string;
};

export class ProductStore {
  async getAllProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get all products ${err}`);
    }
  }

  async getProduct(product_id: number): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE product_id=($1)`;
      const result = await conn.query(sql, [product_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get a product(product_id: ${product_id}) ${err}`);
    }
  }

  async createProduct(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3)`;
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Cannot create a product ${err}`);
    }
  }

  // async updateProduct(product_id: number, p: Object): Promise<Product> {
  //   try {
  //     const conn = await client.connect();
  //     const updates = Object.keys(p)
  //       .map((key) => `${key} = ${p[key]}`)
  //       .join(' ');
  //     const sql = `UPDATE products SET ${updates} WHERE product_id = ${product_id}`;
  //     const result = await conn.query(sql, p);
  //     conn.release();
  //     return result.rows[0];
  //   } catch (err) {
  //     throw new Error(`Cannot update a product(product_id: ${product_id}) ${err}`);
  //   }
  // }

  async deleteProduct(product_id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM products WHERE product_id=($1)`;
      const result = await conn.query(sql, [product_id]);
      conn.release();
      // @ts-ignore
      return result;
    } catch (err) {
      throw new Error(
        `Cannot delete the product(product_id: ${product_id}) ${err}`
      );
    }
  }
}
