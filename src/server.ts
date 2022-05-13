import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../config.env') });

const productRouter = require('./handlers/productsRoute');
const userRouter = require('./handlers/usersRoute');
const ordersRouter = require('./handlers/ordersRoute');

const host = process.env.POSTGRES_HOST;
const port = process.env.PORT;

const app: express.Application = express();
const address: string = `http://${host}:${port}`;

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/order', ordersRouter);

app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});
