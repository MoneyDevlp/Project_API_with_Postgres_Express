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
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.show(parseInt(req.params.id));
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        status: "active",
        address: req.body.address,
        user_id: req.body.user_id
    };
    try {
        const orderNew = yield store.create(order);
        res.json(orderNew);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        id: parseInt(req.params.id),
        status: req.body.status,
        address: req.body.address,
        user_id: req.body.user_id
    };
    try {
        const ordeUpdate = yield store.update(order);
        res.json(ordeUpdate);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.delete(parseInt(req.params.id));
        res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const getAllOrderProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderProduct = yield store.indexOrderProduct();
        res.json(orderProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const orderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderProduct = {
        quantity: req.body.quantity,
        order_id: req.params.id,
        product_id: req.body.product_id
    };
    try {
        const addProductNew = yield store.addOrderProduct(orderProduct);
        res.json(addProductNew);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const orderRouter = (app) => {
    app.get("/orders", index);
    app.get("/order/:id", show);
    app.post("/orders", create);
    app.put("/order/:id", update);
    app.delete("/order/:id", deleteOrder);
    app.get("/orderProducts", getAllOrderProduct);
    app.post("/order/:id/product", orderProduct);
};
exports.default = orderRouter;
