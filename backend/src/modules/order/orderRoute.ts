import express from 'express';
import {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getMyOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  verifyPaymentController,
} from './orderController';
import verifyValidate from '../../middlewares/verifyValidate';
import { orderValidation } from './orderValidation';
import { auth } from '../../middlewares/auth';
const Router = express.Router();

Router.post('/add', verifyValidate(orderValidation), createOrderController);
Router.get('/all', auth('admin'), getAllOrdersController);
Router.get('/verify/:id', verifyPaymentController);
Router.get('/my-orders/:id', getMyOrdersController);
Router.get('/:id', getOrderByIdController);
Router.patch('/update/status/:id', auth('admin'), updateOrderStatusController);
Router.delete('/delete/:id', auth('admin'), deleteOrderController);

export const orderRoute = Router;
