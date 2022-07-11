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
const dashboard_1 = require("../services/dashboard");
const store = new dashboard_1.DashboardQueries();
const topFiveProductsBestSelling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.topFiveProductsBestSelling();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const topfiveProductMostExpensive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.topfiveProductMostExpensive();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const productsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.productsByCategory(req.params.category);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const dashboardRouter = (app) => {
    app.get("/topFiveProductsBestSelling", topFiveProductsBestSelling);
    app.get("/topfiveProductMostExpensive", topfiveProductMostExpensive);
    app.get("/productsByCategory/:category", productsByCategory);
};
exports.default = dashboardRouter;
