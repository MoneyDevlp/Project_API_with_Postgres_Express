import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";

const store = new DashboardQueries();

const topFiveProductsBestSelling = async(req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.topFiveProductsBestSelling();
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const topfiveProductMostExpensive = async(req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.topfiveProductMostExpensive();
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const productsByCategory = async(req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.productsByCategory(req.params.category);
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const dashboardRouter = (app: express.Application): void => {
    app.get("/topFiveProductsBestSelling", topFiveProductsBestSelling);
    app.get("/topfiveProductMostExpensive", topfiveProductMostExpensive);
    app.get("/productsByCategory/:category", productsByCategory);
}

export default dashboardRouter;
