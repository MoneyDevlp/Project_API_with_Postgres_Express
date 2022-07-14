import { User, UserStore } from "../models/user";
import supertest from "supertest";
import app from "../server";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { PASSWORD_TEST } = process.env;

const store = new UserStore();

const request = supertest(app);

describe("UserModel", () => {
    let token: string;
    let userId: string;

    beforeAll(async () => {
        const user: User = {
            username: "levantien",
            password: PASSWORD_TEST as string,
        }
        const response = await request.post("/users")
            .send(user)
            .set("Accept", "application/json");
            token = "Bearer " + response.body;
            userId = JSON.parse(JSON.stringify(jwt.decode(response.body))).user.id;
      });

        it("test get all users", async () => {
            const user: User = {
                username: "levantien",
                password: PASSWORD_TEST as string,
            }
            await request.post("/users")
            .send(user)
            .set("Accept", "application/json");

            const response = await request.get("/users")
            .set("Authorization", token);
            expect(response.status).toEqual(200);
        });

        it("test get user by id", async () => {
            const response = await request.get("/user/1")
            .set("Authorization", token);
            expect(response.status).toEqual(200);
        });

        it("test end point create a new user", async () => {
            const user: User = {
                username: "levantien",
                password: PASSWORD_TEST as string,
            }
            const response = await request.post("/users")
            .send(user)
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });

        it("test end point update user", async () => {
            const user: User = {
                username: "vantiena",
                password: PASSWORD_TEST as string,
            }
            const response = await request.put("/users/" + userId)
            .send(user)
            .set("Authorization", token)
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });

        it("test end point delete user", async () => {
            const response = await request.delete("/users/" + userId)
            .set("Authorization", token);
            expect(response.status).toEqual(200);
        });

        it("test authenticate user", async () => {
            const user: User = {
                username: "levantien",
                password: PASSWORD_TEST as string,
            }
            const response = await request.post("/user/authenticate")
            .set("Authorization", token)
            .send(user)
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });
});