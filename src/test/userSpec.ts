import { UserStore } from "../models/user";
import supertest from "supertest";
import app from "../server";

const store = new UserStore();

const request = supertest(app);

describe("UserModel", () => {
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
        let token: string;
        it("test end point create a new user", async () => {
            const response = await request.post("/users")
            .send({
                username: "levantien",
                password: "levantien123"
            })
            .set("Accept", "application/json");
            token = "Bearer " + response.body;
            expect(response.status).toEqual(200);
        });

        it("test end point update user", async () => {
            const response = await request.put("/user/2")
            .set("Authorization", token)
            .send({
                username: "vantien",
                password: "levantien123"
            })
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });

        it("test get all users", async () => {
            const response = await request.get("/users")
            .set("Authorization", token);
            expect(response.status).toEqual(200);
        });

        it("test get user by id", async () => {
            const response = await request.get("/user/1")
            .set("Authorization", token);
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        });

        it("test delete user by id", async () => {
            const response = await request.delete("/user/1")
            .set("Authorization", token)
            .set("Accept", "application/json");
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        });

        it("test authenticate user", async () => {
            const response = await request.post("/user/authenticate")
            .set("Authorization", token)
            .send({
                username: "levantien",
                password: "levantien123"
            })
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });
    });
});