"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const productRouter = require('./routes/productsRoute');
// const userRouter = require('./routes/usersRoute');
const host = process.env.POSTGRES_HOST;
const port = process.env.PORT;
const app = (0, express_1.default)();
const address = `http://${host}:${port}`;
const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.use('/product', productRouter);
app.listen(port, () => {
    console.log(`starting app on: ${address}`);
});
