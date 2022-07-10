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
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    topFiveProductsBestSelling() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "select p.name, p.price, sum(o.quantity) as totalQuantity, count(o.product_id) as totalProductOrder from products p inner join order_products o on p.id = o.product_id group by p.name, p.price order by totalProductOrder desc limit 5";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error ${error}`);
            }
        });
    }
    topfiveProductMostExpensive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    productsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM products WHERE category=($1)";
                const result = yield conn.query(sql, [category]);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
}
exports.DashboardQueries = DashboardQueries;
