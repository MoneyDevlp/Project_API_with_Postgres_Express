import express, {Request, Response} from "express";
import { Product, ProductStore } from "../models/product";
import {verifyAuthToken} from "../services/verifyJWT"

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        const productNew = await store.create(product);
        res.json(productNew);
    } catch (error) {
        res.status(400);
        res.json(error);
        console.log(error);
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
        id: parseInt(req.params.id),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        const productUpdate = await store.update(product);
        res.json(productUpdate);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await store.delete(parseInt(req.params.id));
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const productRouter = (app: express.Application): void => {
    app.get("/products", index);
    app.get("/product/:id", show);
    app.post("/products", verifyAuthToken, create);
    app.put("/products/:id", verifyAuthToken, update);
    app.delete("/products/:id", verifyAuthToken, deleteProduct);
}

export default productRouter;