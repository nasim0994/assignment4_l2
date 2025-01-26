import express from 'express';
const Router = express.Router();
import { orderController } from './orderController';

Router.post('/', orderController.createOrder);
Router.get('/revenue', orderController.calculateRevenue);

export const orderRoute = Router;
