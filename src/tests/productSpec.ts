import { Product, ProductStore } from "../models/product";
import supertest from "supertest";
import app from "../server";
import dotenv from "dotenv";
import { User, UserStore } from "../models/user";

dotenv.config();

const { PASSWORD_TEST } = process.env;

const store = new ProductStore();

const userStore = new UserStore();

const request = supertest(app);


describe("ProductModel", () => {

    let token: string;

    beforeAll(async () => {
        const user: User = {
            username: "levantien",
            password: PASSWORD_TEST as string,
        }
        const response = await request.post("/users")
            .send(user)
            .set("Accept", "application/json");
            token = "Bearer " + response.body;
      });

        it("test end point create a new product", async () => {
            const product: Product = {
                name: "Tivi",
                price: 100.00,
                category: "Dodientu"
            }
            const response = await request.post("/products")
            .send(product)
            .set("Accept", "application/json")
            .set("Authorization", token)
            expect(response.status).toEqual(200);
        });

        it("test get all products", async () => {
            const product: Product = {
                name: "Lò vi sóng",
                price: 120.00,
                category: "Dodientu"
            }
            await request.post("/products")
            .send(product)
            .set("Accept", "application/json")
            .set("Authorization", token)
            const response = await request.get("/products")
            expect(response.status).toEqual(200);
        });

        it("test get product by id", async () => {
            const response = await request.get("/product/1")
            expect(response.status).toEqual(200);
        });

        it("test end point update product", async () => {
            const product: Product = {
                name: "Maytinh",
                price: 200.00,
                category: "Dodientu"
            }
            const response = await request.put("/products/1") 
            .send(product)
            .set("Accept", "application/json")
            .set("Authorization", token)
            expect(response.status).toEqual(200);
        });

        it("test delete product by id", async () => {
            const response = await request.delete("/products/1")
            .set("Authorization", token)
            .set("Accept", "application/json");
            expect(response.status).toEqual(200);
        });

        it("test get top Five Products Best Selling", async () => {
            const response = await request.get("/topFiveProductsBestSelling")
            expect(response.status).toEqual(200);
        });

        it("test get top five Product Most Expensive", async () => {
            const response = await request.get("/topfiveProductMostExpensive")
            expect(response.status).toEqual(200);
        });

        it("test get products By Category", async () => {
            const response = await request.get("/productsByCategory/Dodientu")
            expect(response.status).toEqual(200);
        });
});