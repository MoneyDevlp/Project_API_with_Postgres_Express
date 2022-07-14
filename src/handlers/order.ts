import express, {Request, Response} from "express";
import { Order, OrderStore, OrderProduct } from "../models/order";
import {verifyAuthToken} from "../services/verifyJWT"

const store = new OrderStore();

const index = async(_req: Request, res: Response): Promise<void> => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async(req: Request, res: Response): Promise<void> => {
    try {
        const orders = await store.show(parseInt(req.params.id));
        res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async(req: Request, res: Response): Promise<void> => {
    const order: Order = {
        status: "active",
        address: req.body.address,
        user_id: req.body.user_id
    };

    try {
        const orderNew = await store.create(order);
        res.json(orderNew);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async(req: Request, res: Response): Promise<void> => {
    const order: Order = {
        id: parseInt(req.params.id),
        status: req.body.status,
        address: req.body.address,
        user_id: req.body.user_id
    };

    try {
        const ordeUpdate = await store.update(order);
        res.json(ordeUpdate);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}


const orderProducts = async (req: Request, res: Response): Promise<void> => {
    const orderProduct: OrderProduct = {
        quantity: req.body.quantity,
        order_id: req.params.id,
        product_id: req.body.product_id
    };
    try {
        const addProductNew = await store.addOrderProduct(orderProduct);
        res.json(addProductNew);
    } catch (error) {
        res.status(400);
        res.json(error);
        console.log(error);
    }
}

const orderRouter = (app: express.Application) => {
    app.get("/orders", verifyAuthToken, index);
    app.get("/order/:id", verifyAuthToken, show);
    app.post("/orders", verifyAuthToken, create);
    app.put("/orders/:id", verifyAuthToken, update);
    app.post("/orders/:id/products", verifyAuthToken,orderProducts);
}

export default orderRouter;