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
const product_1 = require("../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PASSWORD_TEST } = process.env;
const store = new product_1.ProductStore();
const request = (0, supertest_1.default)(server_1.default);
describe("ProductModel", () => {
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
    describe("ProductStore", () => {
        let token;
        it("test authenticate user", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/user/authenticate")
                .set("Authorization", token)
                .send({
                username: "levantien",
                password: PASSWORD_TEST
            })
                .set("Accept", "application/json");
            token = "Bearer " + response.body;
            expect(response.status).toEqual(200);
        }));
        it("test end point create a new product", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/products")
                .set("Authorization", token)
                .send({
                name: "Điện thoại",
                price: 100,
                category: "Đồ điện tử"
            })
                .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        }));
        it("test end point update product", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put("/product/2")
                .set("Authorization", token)
                .send({
                name: "Điện thoại",
                price: 200,
                category: "Đồ điện tử"
            })
                .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        }));
        it("test get all products", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/products")
                .set("Authorization", token);
            expect(response.status).toEqual(200);
        }));
        it("test get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/product/1")
                .set("Authorization", token);
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        }));
        it("test delete product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete("/product/1")
                .set("Authorization", token)
                .set("Accept", "application/json");
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        }));
    });
});
