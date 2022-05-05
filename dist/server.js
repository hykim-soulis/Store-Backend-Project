"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = 8000;
// console.log(process.env);
const productRouter = require('./routes/productsRoute');
// const userRouter = require('./routes/usersRoute');
const app = (0, express_1.default)();
const address = `0.0.0.0:${port}`;
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/product', productRouter);
app.listen(port, () => {
    console.log(`starting app on: ${address}`);
});
