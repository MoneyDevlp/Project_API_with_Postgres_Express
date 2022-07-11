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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyJWT_1 = require("../services/verifyJWT");
dotenv_1.default.config();
const store = new user_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const userNew = yield store.create(user);
        const token = jsonwebtoken_1.default.sign({
            user: userNew
        }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const userUpdate = yield store.update(user);
        const token = jsonwebtoken_1.default.sign({
            user: userUpdate
        }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(400);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.delete(parseInt(req.params.id));
        res.json(user);
    }
    catch (error) {
        res.status(400);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authen = yield store.authenticate(req.body.username, req.body.password);
        if (authen !== null) {
            const token = jsonwebtoken_1.default.sign({
                user: authen
            }, process.env.TOKEN_SECRET);
            res.json(token);
        }
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const userRouter = (app) => {
    app.get("/users", verifyJWT_1.verifyAuthToken, index);
    app.get("/user/:id", verifyJWT_1.verifyAuthToken, show);
    app.post("/users", create);
    app.put("/user/:id", verifyJWT_1.verifyUserId, update);
    app.delete("/user/:id", verifyJWT_1.verifyUserId, deleteUser);
    app.post("/user/authenticate", authenticate);
};
exports.default = userRouter;
