import { UserStore } from "../models/user";
import supertest from "supertest";
import app from "../server";
import dotenv from "dotenv";

dotenv.config();

const { PASSWORD_TEST } = process.env;

const store = new UserStore();

const request = supertest(app);

describe("UserModel", () => {
    let token: string;

    beforeAll(async () => {
        const response = await request.post("/users")
            .send({
                username: "levantien",
                password: PASSWORD_TEST as string,
            })
            .set("Accept", "application/json");
            token = "Bearer " + response.body;
            console.log("new",token);
      });

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

        it("test get all users", async () => {
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
            const response = await request.post("/users")
            .send({
                username: "levantien",
                password: PASSWORD_TEST as string,
            })
            .set("Accept", "application/json");
            console.log("create",token);
            expect(response.status).toEqual(200);
        });

        it("test authenticate user", async () => {
            const response = await request.post("/user/authenticate")
            .set("Authorization", token)
            .send({
                username: "levantien",
                password: PASSWORD_TEST as string
            })
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });
    });
});