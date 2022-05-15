"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const dotenv = require('dotenv');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200,
};
dotenv.config({ path: path_1.default.join(__dirname, '../config.env') });
const host = process.env.POSTGRES_HOST;
const port = process.env.PORT;
const address = `http://${host}:${port}`;
const productRouter = require('./handlers/productsRoute');
const userRouter = require('./handlers/usersRoute');
const ordersRouter = require('./handlers/ordersRoute');
const top5populaRouter = require('./handlers/top5popularRoute');
const app = (0, express_1.default)();
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/order', ordersRouter);
app.use('/top-5-popular', top5populaRouter);
app.listen(port, () => {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
