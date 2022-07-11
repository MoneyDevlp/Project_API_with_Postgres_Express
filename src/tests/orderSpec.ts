import { OrderStore } from "../models/order"; 
import supertest from "supertest";
import app from "../server";

const store = new OrderStore();

const request = supertest(app);

describe("OrderModel", () => {
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

    it("method getAllOrderProduct have to defined", () => {
        expect(store.indexOrderProduct).toBeDefined();
    });

    it("method orderProduct have to defined", () => {
        expect(store.addOrderProduct).toBeDefined();
    });

    describe("OrderStore", () => {
        it("test end point create a new order", async () => {
            const response = await request.post("/orders")
            .send({
                address: "Quảng Nam",
                user_id: 1,
            })
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });

        it("test end point update order", async () => {
            const response = await request.put("/product/2")
            .send({
                status: "active",
                address: "Đà Nẵng",
                user_id: 1,
            })
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });

        it("test get all orders", async () => {
            const response = await request.get("/orders")
            expect(response.status).toEqual(200);
        });

        it("test get order by id", async () => {
            const response = await request.get("/order/1")
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        });

        it("test delete order by id", async () => {
            const response = await request.delete("/order/1")
            .set("Accept", "application/json");
            expect(response.status).toHaveBeenCalledWith('1');
            expect(response.status).toEqual(200);
        });

        it("test get all order product", async () => {
            const response = await request.get("/orderProducts")
            expect(response.status).toEqual(200);
        });

        it("test end point create a new order product", async () => {
            const response = await request.post("/order/2/product")
            .send({
                quantity: 20,
                product_id: "1",
            })
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });
    });
});