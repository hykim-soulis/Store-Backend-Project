"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
let orderToken;
const sampleUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'test@test.com',
    password: 'test1234',
};
const sampleLogin = { email: 'test@test.com', password: 'test1234' };
const sampleProducts = [
    { name: 'cup', price: 15, category: 'kitchen' },
    { name: 'fork', price: 21, category: 'kitchen' },
    { name: 'shampoo', price: 8, category: 'bathroom' },
    { name: 'toothpaste', price: 6, category: 'bathroom' },
    { name: 'book', price: 12, category: 'office' },
];
const sampleOrderProducts = [
    { quantity: 5, product_id: 1 },
    { quantity: 4, product_id: 2 },
    { quantity: 7, product_id: 3 },
    { quantity: 2, product_id: 4 },
    { quantity: 8, product_id: 5 },
    { quantity: 3, product_id: 1 },
    { quantity: 1, product_id: 2 },
    { quantity: 2, product_id: 3 },
    { quantity: 11, product_id: 4 },
];
beforeAll(async () => {
    // Signup new User
    await request
        .post('/user/signup')
        .send(sampleUser)
        .set('Accept', 'application/json');
    // Login to newUser account and Get token
    const loggedInUser = await request
        .post('/user/login')
        .send(sampleLogin)
        .set('Accept', 'application/json');
    orderToken = loggedInUser.body.token;
    // Post sample porducts
    const productPostPromise = sampleProducts.map(async (el) => await request
        .post('/product')
        .send(el)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${orderToken}`));
    await Promise.all(productPostPromise);
    // Post a sample completed order
    await request
        .post('/order')
        .send({ status: 'active' })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${orderToken}`);
});
describe('Route endpoint tests', () => {
    describe('Testing product Model endpoints', () => {
        it('POST /product posts a new product', async () => {
            const response = await request
                .post('/product')
                .send({ name: 'note', price: 4, category: 'office' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.status).toBe(201);
        });
        it('GET /product shows all 6 products', async () => {
            const response = await request
                .get('/product')
                .set('Accept', 'application/json');
            // console.log(response.body.data.products);
            expect(response.body.data.products.length).toBe(6);
        });
        it('GET /product?category=kitchen shows all 2 kitchen products', async () => {
            const response = await request
                .get('/product?category=kitchen')
                .set('Accept', 'application/json');
            expect(response.body.data.products.length).toBe(2);
        });
        it('GET /product/1 shows product_id 1 product', async () => {
            const response = await request
                .get('/product/1')
                .set('Accept', 'application/json');
            expect(response.body.data.product.name).toBe('cup');
        });
        it('PUT /product/6 updates the note product price', async () => {
            const response = await request
                .put('/product/6')
                .send({ name: 'note', price: 15, category: 'office' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.body.data.product.price).toBe(15);
        });
        it('DELETE /product/6 delete the product with id 6', async () => {
            const response = await request
                .delete('/product/6')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.status).toBe(204);
        });
    });
    describe('Testing orderModel endpoints', () => {
        it('POST /order posts a new order', async () => {
            const response = await request
                .post('/order')
                .send({ status: 'active' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.status).toBe(201);
        });
        it('POST /order/2/products posts new products to the exsiting order', async () => {
            const response = await request
                .post('/order/2/products')
                .send({ quantity: 11, product_id: 4 })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.status).toBe(201);
        });
        it('GET /order shows all 2 active orders for the logged in user', async () => {
            const response = await request
                .get('/order')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.body.data.orders.length).toBe(2);
        });
        it('PUT /order/1 updates the order status for the logged in user', async () => {
            const response = await request
                .put('/order/1')
                .send({ status: 'completed' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.body.data.order.status).toBe('completed');
        });
        it('GET /order?status=active shows 1 active order for the logged in user', async () => {
            const response = await request
                .get('/order?status=active')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.body.data.orders.length).toBe(1);
        });
        it('DELETE /order/1 deletes the order with id 1', async () => {
            const response = await request
                .delete('/order/10')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.status).toBe(204);
        });
    });
    describe('Testing /top-5-popular endpoints', () => {
        it('GET /top-5-popular shows top 5 popular products', async () => {
            const orderPostPromise = sampleOrderProducts.map(async (el) => await request
                .post('/order/2/products')
                .send(el)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`));
            await Promise.all(orderPostPromise);
            const response = await request
                .get('/top-5-popular')
                .set('Accept', 'application/json');
            expect(response.body.data.products.length).toBe(5);
        });
    });
    describe('Testing User Model endpoints', () => {
        orderToken = '';
        it('POST /user/signup signs up a new user', async () => {
            const response = await request
                .post('/user/signup')
                .send({
                first_name: 'Alex',
                last_name: 'Jackson',
                email: 'alexJackson@test.com',
                password: 'test1234',
            })
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
        });
        it('POST /user/login login a user', async () => {
            const response = await request
                .post('/user/login')
                .send({
                email: 'alexJackson@test.com',
                password: 'test1234',
            })
                .set('Accept', 'application/json');
            orderToken = response.body.token;
            expect(response.status).toBe(200);
        });
        it('GET /user shows all 2 users', async () => {
            const response = await request
                .get('/user')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.body.data.users.length).toBe(2);
        });
        it('GET /user/2 shows 1 user', async () => {
            const response = await request
                .get('/user/2')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.body.data.user.email).toBe('alexJackson@test.com');
        });
        it('DELETE /user delete the logged in user', async () => {
            const response = await request
                .delete('/user')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${orderToken}`);
            expect(response.status).toBe(204);
        });
    });
});
