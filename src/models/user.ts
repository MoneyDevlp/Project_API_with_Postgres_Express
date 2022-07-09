import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { PEPPER, SALT_ROUNDS } = process.env;

export type User = {
    id?: number;
    username: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const connect = await client.connect();
            const sql = "SELECT * FROM users";
            const result = await connect.query(sql);

            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Don't get users, error ${error}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const connect = await client.connect();
            const sql = "SELECT * FROM users WHERE id = ($1)";
            const result = await connect.query(sql, [id]);

            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Don't get user ${id}, error ${error}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const connect = await client.connect();
            const sql = "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *";
            const password_hash = bcrypt.hashSync(u.password + PEPPER, parseInt(SALT_ROUNDS as string));
            const result = await connect.query(sql, [u.username, password_hash]);

            const user = result.rows[0];
            connect.release();
            return user;
        } catch (error) {
            throw new Error(`Don't create user, error ${error}`);
        }
    }

    async update(u: User): Promise<User> {
        try {
            const connect = await client.connect();
            const sql = "UPDATE users SET username = ($1), password = ($2) WHERE id = ($3) RETURNING *";
            const password_hash = bcrypt.hashSync(u.password + PEPPER, parseInt(SALT_ROUNDS as string));
            const result = await connect.query(sql, [u.username, password_hash, u.id]);

            const user = result.rows[0];
            connect.release();
            return user;
        } catch (error) {
            throw new Error(`Don't update user, error ${error}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const connect = await client.connect();
            const sql = "DELETE FROM users WHERE id = ($1)";
            const result = await connect.query(sql, [id]);

            const user = result.rows[0];
            connect.release();
            return user;
        } catch (error) {
            throw new Error(`Don't delete user ${id}, error ${error}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const connect = await client.connect();
            const sql = "SELECT password FROM users WHERE username = ($1)";
            const result = await connect.query(sql, [username]);

            if(result.rows.length) {
                const user = result.rows[0];
                if(bcrypt.compareSync(password + PEPPER, user.password)) {
                    return user;
                }   
            }
            return null;
        } catch (error) {
            throw new Error(`Don't authenticate user ${username} + " " + ${username}, error ${error}`);
        }
    }
}

