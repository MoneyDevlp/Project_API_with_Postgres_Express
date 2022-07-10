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
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyJWT_1 = require("../services/verifyJWT");
const store = new product_1.ProductStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(parseInt(req.params.id));
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        const productNew = yield store.create(product);
        res.json(productNew);
    }
    catch (error) {
        res.status(400);
        res.json(error);
        console.log(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        id: parseInt(req.params.id),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        const productUpdate = yield store.update(product);
        res.json(productUpdate);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.delete(parseInt(req.params.id));
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const productRouter = (app) => {
    app.get("/products", index);
    app.get("/product/:id", show);
    app.post("/products", verifyJWT_1.verifyAuthToken, create);
    app.put("/product/:id", verifyJWT_1.verifyAuthToken, update);
    app.delete("/product/:id", verifyJWT_1.verifyAuthToken, deleteProduct);
};
exports.default = productRouter;
