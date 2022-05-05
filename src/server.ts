import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const port = 8000;
// console.log(process.env);
const productRouter = require('./routes/productsRoute');
// const userRouter = require('./routes/usersRoute');

const app: express.Application = express();
const address: string = `0.0.0.0:${port}`;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/product', productRouter);

app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});
