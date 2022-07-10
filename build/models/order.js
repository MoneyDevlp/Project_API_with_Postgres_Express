"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Don't get order, error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE id = ($1)";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Don't get order ${id}, error: ${error}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "INSERT INTO orders(status,address,user_id) VALUES ($1, $2, $3) RETURNING *";
                const result = yield connect.query(sql, [o.status, o.address, o.user_id]);
                const order = result.rows[0];
                connect.release();
                return order;
            }
            catch (error) {
                throw new Error(`Don't create order, error: ${error}`);
            }
        });
    }
    update(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "UPDATE orders SET status = ($1), address = ($2), user_id = ($3) WHERE id = ($4) RETURNING *";
                const result = yield connect.query(sql, [o.status, o.address, o.user_id, o.id]);
                const order = result.rows[0];
                connect.release();
                return order;
            }
            catch (error) {
                throw new Error(`Don't update order, error: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "DELETE FROM orders WHERE id = ($1)";
                const result = yield connect.query(sql, [id]);
                const order = result.rows[0];
                connect.release();
                return order;
            }
            catch (error) {
                throw new Error(`Don't delete order ${id}, error: ${error}`);
            }
        });
    }
    indexOrderProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM order_products";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Don't get orderProduct, error: ${error}`);
            }
        });
    }
    addOrderProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE id = ($1)";
                const result = yield connect.query(sql, [p.order_id]);
                const order = result.rows[0];
                if (order.status !== "active") {
                    throw new Error(`Product ${p.product_id} don't order because status is ${order.status}`);
                }
                connect.release();
            }
            catch (error) {
                throw new Error(`Error ${error}`);
            }
            try {
                const connect = yield database_1.default.connect();
                const sql = "INSERT INTO order_products(quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
                const result = yield connect.query(sql, [p.quantity, p.order_id, p.product_id]);
                const orderProduct = result.rows[0];
                connect.release();
                return orderProduct;
            }
            catch (error) {
                throw new Error(`Don't create orderProduct, error: ${error}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
