import client from "../database";

export type Order = {
    id?: number;
    status: string;
    address: string;
    user_id: string;
}

export type OrderProduct = {
    id?: number;
    quantity: number;
    order_id: string;
    product_id: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const connect = await client.connect();
            const sql = "SELECT * FROM orders";
            const result = await connect.query(sql);

            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Don't get order, error: ${error}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const connect = await client.connect();
            const sql = "SELECT * FROM orders WHERE id = ($1)";
            const result = await connect.query(sql, [id]);

            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Don't get order ${id}, error: ${error}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const connect = await client.connect();
            const sql = "INSERT INTO orders(status,address,user_id) VALUES ($1, $2, $3) RETURNING *";
            const result = await connect.query(sql, [o.status, o.address, o.user_id]);

            const order = result.rows[0];
            connect.release();
            return order;
        } catch (error) {
            throw new Error(`Don't create order, error: ${error}`);
        }
    }

    async update(o: Order): Promise<Order> {
        try {
            const connect = await client.connect();
            const sql = "UPDATE orders SET status = ($1), address = ($2), user_id = ($3) WHERE id = ($4) RETURNING *"
            const result = await connect.query(sql, [o.status, o.address, o.user_id, o.id]);

            const order = result.rows[0];
           connect.release();
           return order;
        } catch (error) {
            throw new Error(`Don't update order, error: ${error}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const connect = await client.connect();
            const sql = "DELETE FROM orders WHERE id = ($1)";
            const result = await connect.query(sql, [id]);

            const order = result.rows[0];
            connect.release();
            return order;
        } catch (error) {
            throw new Error(`Don't delete order ${id}, error: ${error}`);
        }
    }

    async indexOrderProduct(): Promise<OrderProduct[]> {
        try {
            const connect = await client.connect();
            const sql = "SELECT * FROM order_products";
            const result = await connect.query(sql);

            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Don't get orderProduct, error: ${error}`);
        }
    }

    async addOrderProduct(p: OrderProduct): Promise<Order> {
        try {
            const connect = await client.connect();
            const sql = "SELECT * FROM orders WHERE id = ($1)";
            const result = await connect.query(sql, [p.order_id]);

            const order = result.rows[0];
            if(order.status !== "active") {
                throw new Error(`Product ${p.product_id} don't order because status is ${order.status}`);
            }
            connect.release();
        } catch (error) {
            throw new Error(`Error ${error}`);
        }

        try {
            const connect = await client.connect();
            const sql = "INSERT INTO order_products(quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
            const result = await connect.query(sql, [p.quantity, p.order_id, p.product_id]);

            const orderProduct = result.rows[0];
            connect.release();
            return orderProduct;
        } catch (error) {
            throw new Error(`Don't create orderProduct, error: ${error}`);
        }
    }
}