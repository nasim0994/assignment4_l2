import express from 'express';
import {
  createOrderController,
  getMyOrdersController,
  getOrderByIdController,
  verifyPaymentController,
} from './orderController';
import verifyValidate from '../../middlewares/verifyValidate';
import { orderValidation } from './orderValidation';
const Router = express.Router();

Router.post('/add', verifyValidate(orderValidation), createOrderController);
Router.get('/verify/:id', verifyPaymentController);
Router.get('/my-orders/:id', getMyOrdersController);
Router.get('/:id', getOrderByIdController);

export const orderRoute = Router;
