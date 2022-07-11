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
const order_1 = require("../models/order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const store = new order_1.OrderStore();
const request = (0, supertest_1.default)(server_1.default);
describe("OrderModel", () => {
    it("method index have to defined", () => {
        expect(store.index).toBeDefined();
    });
    it("method show have to defined", () => {
        expect(store.show).toBeDefined();
    });
    it("method create have to defined", () => {
        expect(store.create).toBeDefined();
    });
    it("method update have to defined", () => {
        expect(store.update).toBeDefined();
    });
    it("method delete have to defined", () => {
        expect(store.delete).toBeDefined();
    });
    it("method getAllOrderProduct have to defined", () => {
        expect(store.indexOrderProduct).toBeDefined();
    });
    it("method orderProduct have to defined", () => {
        expect(store.addOrderProduct).toBeDefined();
    });
    describe("OrderStore", () => {
        it("test end point create a new order", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/orders")
                .send({
                address: "Quảng Nam",
                user_id: 1,
            })
                .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        }));
        it("test end point update order", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put("/product/2")
                .send({
                status: "active",
                address: "Đà Nẵng",
                user_id: 1,
            })
                .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        }));
        it("test get all orders", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/orders");
            expect(response.status).toEqual(200);
        }));
        it("test get order by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/order/1");
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        }));
        it("test delete order by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete("/order/1")
                .set("Accept", "application/json");
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        }));
        it("test get all order product", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/orderProducts");
            expect(response.status).toEqual(200);
        }));
        it("test end point create a new order product", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/order/2/product")
                .send({
                quantity: 20,
                product_id: "1",
            })
                .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        }));
    });
});
