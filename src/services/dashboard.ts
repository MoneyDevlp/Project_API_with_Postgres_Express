import client from "../database";
import { Product } from "../models/product";

export type topFiveProduct = {
    name: string;
    price: string;
    totalQuantity: number;
    totalProductOrder: bigint;
}

export class DashboardQueries {
    async topFiveProductsBestSelling(): Promise<topFiveProduct[]> {
        try {
            const connect = await client.connect();
            const sql = "select p.name, p.price, sum(o.quantity) as totalQuantity, count(o.product_id) as totalProductOrder from products p inner join order_products o on p.id = o.product_id group by p.name, p.price order by totalProductOrder desc limit 5";
            
            const result = await connect.query(sql);

            connect.release();
            
            return result.rows;
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
    }

    async topfiveProductMostExpensive(): Promise<{name: string, price: number}[]> {
        try {
          const conn = await client.connect()
          const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows
        } catch (error) {
          throw new Error(`Error: ${error}`)
        } 
    }

    async productsByCategory(category: string): Promise<Product[]> {
        try {
          const conn = await client.connect();
          const sql = "SELECT * FROM products WHERE category=($1)";

          const result = await conn.query(sql, [category]);

          conn.release();
    
          return result.rows;
        } catch (error) {
          throw new Error(`Error: ${error}`);
        }
    }
}