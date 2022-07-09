import client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number | string;
    category: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const connect = await client.connect();
            const sql = "SELECT * FROM products";
            const result = await connect.query(sql);
            
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Don't get products, error: ${error}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const connect = await client.connect();
            const sql = "SELECT * FROM products WHERE id = ($1)";
            const result = await connect.query(sql, [id]);

            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Don't find products ${id}, error: ${error}`);          
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const connect = await client.connect();
            const sql = "INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING *";
            const result = await connect.query(sql, [p.name, p.price, p.category]);

            const product = result.rows[0];
            connect.release();
            return product;
        } catch (error) {
            console.log(error);
            throw new Error(`Don't create products, error: ${error}`);
        }
    }

    async update(p: Product): Promise<Product> {
        try {
            const connect = await client.connect();
            const sql = "UPDATE products SET name = ($1), price = ($2), category = ($3) WHERE id = ($4) RETURNING *";
            const result = await connect.query(sql, [p.name, p.price, p.category, p.id]);

            const product = result.rows[0];
            connect.release();
            return product;
        } catch (error) {
            throw new Error(`Don't update products${p.name}, error: ${error}`);
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const connect = await client.connect();
            const sql = "DELETE FROM products WHERE id = ($1)";
            const result = await connect.query(sql, [id]);
            
            const product = result.rows[0];
            connect.release();
            return product;
        } catch (error) {
            throw new Error(`Don't delete products ${id}, error: ${error}`);
        }
    }
}