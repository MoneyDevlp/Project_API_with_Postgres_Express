import { ProductStore } from "../models/product";
import supertest from "supertest";
import app from "../server";

const store = new ProductStore();

const request = supertest(app);

describe("ProductModel", () => {
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

    describe("ProductStore", () => {
        let token: string;

        it("test authenticate user", async () => {
            const response = await request.post("/user/authenticate")
            .set("Authorization", token)
            .send({
                username: "levantien",
                password: "levantien123"
            })
            .set("Accept", "application/json");
            token = "Bearer " + response.body;
            expect(response.status).toEqual(200);
        });

        it("test end point create a new product", async () => {
            const response = await request.post("/products")
            .set("Authorization", token)
            .send({
                name: "Điện thoại",
                price: 100,
                category: "Đồ điện tử"
            })
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });

        it("test end point update product", async () => {
            const response = await request.put("/product/2")
            .set("Authorization", token)
            .send({
                name: "Điện thoại",
                price: 200,
                category: "Đồ điện tử"
            })
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });

        it("test get all products", async () => {
            const response = await request.get("/products")
            .set("Authorization", token);
            expect(response.status).toEqual(200);
        });

        it("test get product by id", async () => {
            const response = await request.get("/product/1")
            .set("Authorization", token);
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        });

        it("test delete product by id", async () => {
            const response = await request.delete("/product/1")
            .set("Authorization", token)
            .set("Accept", "application/json");
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        });
    });
});