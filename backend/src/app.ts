/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import router from './routes';
import globalErrorHandler from './errors/globalErrorhandler';
import { notFound } from './errors/notFound';
import cookieParser from 'cookie-parser';
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.send(`server is running on port ${config.PORT} 🏃‍♂️‍➡️`);
});

// use Routes
app.use('/api', router);

// global error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
