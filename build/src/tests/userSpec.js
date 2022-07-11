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
const user_1 = require("../models/user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PASSWORD_TEST } = process.env;
const store = new user_1.UserStore();
const request = (0, supertest_1.default)(server_1.default);
describe("UserModel", () => {
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
    it("method authenticate have to defined", () => {
        expect(store.authenticate).toBeDefined();
    });
    describe("UserStore", () => {
        let token;
        it("test end point create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/users")
                .send({
                username: "levantien",
                password: PASSWORD_TEST,
            })
                .set("Accept", "application/json")
                .expect('Content-Type', /json/);
            token = "Bearer " + response.body;
            expect(response.status).toEqual(200);
        }));
        it("test get all users", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/users")
                .set("authorization", token);
            expect(response.status).toEqual(200);
        }));
        it("test get user by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/user/1")
                .set("authorization", token);
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        }));
        it("test end point update user", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put("/user/1")
                .set("authorization", token)
                .send({
                username: "vantien",
                password: PASSWORD_TEST
            })
                .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        }));
        it("test delete user by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete("/user/1")
                .set("authorization", token)
                .set("Accept", "application/json");
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        }));
        it("test authenticate user", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/user/authenticate")
                .set("authorization", token)
                .send({
                username: "levantien",
                password: PASSWORD_TEST
            })
                .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        }));
    });
});
