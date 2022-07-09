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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connect = _a.sent();
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, connect.query(sql)];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Don't get order, error: ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connect = _a.sent();
                        sql = "SELECT * FROM orders WHERE id = ($1)";
                        return [4 /*yield*/, connect.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Don't get order ".concat(id, ", error: ").concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, order, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connect = _a.sent();
                        sql = "INSERT INTO orders(status,address,user_id) VALUES ($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, connect.query(sql, [o.status, o.address, o.user_id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connect.release();
                        return [2 /*return*/, order];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Don't create order, error: ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.update = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, order, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connect = _a.sent();
                        sql = "UPDATE orders SET status = ($1), address = ($2), user_id = ($3) WHERE id = ($4) RETURNING *";
                        return [4 /*yield*/, connect.query(sql, [o.status, o.address, o.user_id, o.id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connect.release();
                        return [2 /*return*/, order];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Don't update order, error: ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, order, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connect = _a.sent();
                        sql = "DELETE FROM orders WHERE id = ($1)";
                        return [4 /*yield*/, connect.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connect.release();
                        return [2 /*return*/, order];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Don't delete order ".concat(id, ", error: ").concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.indexOrderProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connect = _a.sent();
                        sql = "SELECT * FROM order_products";
                        return [4 /*yield*/, connect.query(sql)];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("Don't get orderProduct, error: ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addOrderProduct = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, order, error_7, connect, sql, result, orderProduct, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connect = _a.sent();
                        sql = "SELECT * FROM orders WHERE id = ($1)";
                        return [4 /*yield*/, connect.query(sql, [p.order_id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        if (order.status !== "active") {
                            throw new Error("Product ".concat(p.product_id, " don't order because status is ").concat(order.status));
                        }
                        connect.release();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        throw new Error("Error ".concat(error_7));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 5:
                        connect = _a.sent();
                        sql = "INSERT INTO order_products(quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, connect.query(sql, [p.quantity, p.order_id, p.product_id])];
                    case 6:
                        result = _a.sent();
                        orderProduct = result.rows[0];
                        connect.release();
                        return [2 /*return*/, orderProduct];
                    case 7:
                        error_8 = _a.sent();
                        throw new Error("Don't create orderProduct, error: ".concat(error_8));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
