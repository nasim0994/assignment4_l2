import express from 'express';
import {
  createOrderController,
  verifyPaymentController,
} from './orderController';
import verifyValidate from '../../middlewares/verifyValidate';
import { orderValidation } from './orderValidation';
const Router = express.Router();

Router.post('/add', verifyValidate(orderValidation), createOrderController);
Router.get('/verify/:id', verifyPaymentController);

export const orderRoute = Router;
