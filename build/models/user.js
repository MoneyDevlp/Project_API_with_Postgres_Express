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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PEPPER, SALT_ROUNDS } = process.env;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM users";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Don't get users, error ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE id = ($1)";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Don't get user ${id}, error ${error}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *";
                const password_hash = bcrypt_1.default.hashSync(u.password + PEPPER, parseInt(SALT_ROUNDS));
                const result = yield connect.query(sql, [u.username, password_hash]);
                const user = result.rows[0];
                connect.release();
                return user;
            }
            catch (error) {
                throw new Error(`Don't create user, error ${error}`);
            }
        });
    }
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "UPDATE users SET username = ($1), password = ($2) WHERE id = ($3) RETURNING *";
                const password_hash = bcrypt_1.default.hashSync(u.password + PEPPER, parseInt(SALT_ROUNDS));
                const result = yield connect.query(sql, [u.username, password_hash, u.id]);
                const user = result.rows[0];
                connect.release();
                return user;
            }
            catch (error) {
                throw new Error(`Don't update user, error ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "DELETE FROM users WHERE id = ($1)";
                const result = yield connect.query(sql, [id]);
                const user = result.rows[0];
                connect.release();
                return user;
            }
            catch (error) {
                throw new Error(`Don't delete user ${id}, error ${error}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT password FROM users WHERE username = ($1)";
                const result = yield connect.query(sql, [username]);
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + PEPPER, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error(`Don't authenticate user ${username} + " " + ${username}, error ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
