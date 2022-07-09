import express, {Request, Response} from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {verifyAuthToken, verifyUserId} from "../services/verifyJWT"

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await store.show(parseInt(req.params.id));
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const userNew = await store.create(user);
        const token = jwt.sign(
            {
                user: userNew
            },
            process.env.TOKEN_SECRET as jwt.Secret
        );
        res.json(token);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const userUpdate = await store.update(user);
        const token = jwt.sign(
            {
                user: userUpdate
            },
            process.env.TOKEN_SECRET as jwt.Secret
        );
        res.json(token);
    } catch (error) {
        res.status(400);
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await store.delete(parseInt(req.params.id));
        res.json(user);
    } catch (error) {
        res.status(400);
    }
}

const authenticate = async (req: Request, res: Response): Promise<void> => {
    try {
        const authen = await store.authenticate(
            req.body.username,
            req.body.password
        );

        if(authen !== null) {
            const token = jwt.sign(
                {
                    user: authen
                },
                process.env.TOKEN_SECRET as jwt.Secret
            );
            res.json(token);
        }
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const userRouter = (app: express.Application): void => {
    app.get("/users", verifyAuthToken, index);
    app.get("/user/:id", verifyAuthToken, show);
    app.post("/users", create);
    app.put("/user/:id", verifyUserId, update);
    app.delete("/user/:id", verifyUserId, deleteUser);
    app.post("/user/authenticate",authenticate);
}

export default userRouter;
