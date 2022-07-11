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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM products";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Don't get products, error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM products WHERE id = ($1)";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Don't find products ${id}, error: ${error}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING *";
                const result = yield connect.query(sql, [p.name, p.price, p.category]);
                const product = result.rows[0];
                connect.release();
                return product;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Don't create products, error: ${error}`);
            }
        });
    }
    update(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "UPDATE products SET name = ($1), price = ($2), category = ($3) WHERE id = ($4) RETURNING *";
                const result = yield connect.query(sql, [p.name, p.price, p.category, p.id]);
                const product = result.rows[0];
                connect.release();
                return product;
            }
            catch (error) {
                throw new Error(`Don't update products${p.name}, error: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "DELETE FROM products WHERE id = ($1)";
                const result = yield connect.query(sql, [id]);
                const product = result.rows[0];
                connect.release();
                return product;
            }
            catch (error) {
                throw new Error(`Don't delete products ${id}, error: ${error}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
