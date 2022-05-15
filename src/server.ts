import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const dotenv = require('dotenv');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

dotenv.config({ path: path.join(__dirname, '../config.env') });

const host = process.env.POSTGRES_HOST;
const port = process.env.PORT;
const address: string = `http://${host}:${port}`;

const productRouter = require('./handlers/productsRoute');
const userRouter = require('./handlers/usersRoute');
const ordersRouter = require('./handlers/ordersRoute');
const top5populaRouter = require('./handlers/top5popularRoute');

const app: express.Application = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/order', ordersRouter);
app.use('/top-5-popular', top5populaRouter);

app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});

export default app;
