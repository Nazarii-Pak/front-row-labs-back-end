import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import reviewRouter from './routes/reviews';
import authorsRouter from './routes/authors';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
export const prisma = new PrismaClient();
const PORT = 8080;

app.use('/api', (_req, _res, next) => {
  next();
});
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());
app.use('/reviews', reviewRouter);
app.use('/authors', authorsRouter);

app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message || 'Internal Server Error. Please try again later.',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
