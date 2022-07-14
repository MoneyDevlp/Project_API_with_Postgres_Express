import { Order, OrderProduct, OrderStore } from "../models/order"; 
import supertest from "supertest";
import app from "../server";
import dotenv from "dotenv";
import { ProductStore } from "../models/product";
import { User, UserStore } from "../models/user";

dotenv.config();

const { PASSWORD_TEST } = process.env;

const store = new OrderStore();

const productStore = new ProductStore();

const userStore = new UserStore();

const request = supertest(app);

const user: User = {
    username: "levantien",
    password: PASSWORD_TEST as string,
}

describe("OrderModel", () => {
    let token: string;
    beforeAll(async () => {

        const response = await request.post("/users")
            .send({
                username: "levantien",
                password: PASSWORD_TEST as string,
        })
        .set("Accept", "application/json");
        token = "Bearer " + response.body;

        await request.post("/users")
            .send({
                username: "levantien",
                password: PASSWORD_TEST as string,
        })
        .set("Accept", "application/json");

        await request.post("/users")
            .send({
                username: "vantienb",
                password: PASSWORD_TEST as string,
        })
        .set("Accept", "application/json");

        await request.post("/users")
            .send({
                username: "vantienc",
                password: PASSWORD_TEST as string,
        })
        .set("Accept", "application/json");
    
        await request.post("/products")
            .send({
                name: "Dienthoai",
                price: 100.00,
                category: "Dodientu"
        })
        .set("Authorization", token);

        await request.post("/products")
            .send({
                name: "Tulanh",
                price: 120.00,
                category: "Dodientu"
        })
        .set("Authorization", token);

        await request.post("/orders")
            .send({
                address: "Quảng Nam",
                user_id: 3,
        })

        await request.post("/orders")
            .send({
                address: "Quảng Bình",
                user_id: 3,
        })

        await request.post("/orders")
            .send({
                address: "Hà Nội",
                user_id: 3,
        })
        .set("Accept", "application/json")
        .set("Authorization", token)

        await request.post("/orders")
            .send({
                address: "Hồ Chí Minh",
                user_id: 3,
        })
        .set("Accept", "application/json")
        .set("Authorization", token)
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

    it("method getAllOrderProduct have to defined", () => {
        expect(store.indexOrderProduct).toBeDefined();
    });

    it("method orderProduct have to defined", () => {
        expect(store.addOrderProduct).toBeDefined();
    });

    describe("OrderStore", () => {
        it("test end point create a new order", async () => {
            const order: Order = {
                address: "Huế",
                user_id: String(3),
            }
            const response = await request.post("/orders")
            .send(order)
            .set("Accept", "application/json")
            .set("Authorization", token)
            expect(response.status).toEqual(200);
        });

        it("test end point update order", async () => {
            const order: Order = {
                status: "active",
                address: "Đà Nẵng",
                user_id: String(3),
            }
            const response = await request.put("/orders/1")
            .send(order)
            .set("Accept", "application/json")
            .set("Authorization", token)
            expect(response.status).toEqual(200);
        });

        it("test get all orders", async () => {
            const response = await request.get("/orders")
            .set("Authorization", token)
            expect(response.status).toEqual(200);
        });

        it("test get order by id", async () => {
            const response = await request.get("/order/1")
            .set("Authorization", token)
            expect(response.status).toEqual(200);
        });

        it("test delete order by id", async () => {
            const response = await request.delete("/orders/1")
            .set("Accept", "application/json")
            .set("Authorization", token)
            expect(response.status).toEqual(200);
        });

        it("test end point create a new order product", async () => {
            const orderProduct: OrderProduct = {
                quantity: 50,
                order_id: String(2),
                product_id: String(2),
            }
            const response = await request.post("/orders/2/products")
            .send(orderProduct)
            .set("Accept", "application/json")
            .set("Authorization", token)
            expect(response.status).toEqual(200);
        });
    });
});