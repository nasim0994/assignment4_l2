import express from 'express';
import { createOrderController } from './orderController';
const Router = express.Router();

Router.post('/add', createOrderController);

export const orderRoute = Router;
