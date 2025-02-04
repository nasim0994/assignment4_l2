import {
  createOrderService,
  getMyOrdersService,
  getOrderByIdService,
  verifyPaymentService,
} from './orderService';
import { catchAsync } from '../../utils/catchAsync';

export const createOrderController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await createOrderService(data, req.ip!);

  res.status(200).json({
    success: true,
    message: 'Order placed successfully',
    data: result,
  });
});

export const verifyPaymentController = catchAsync(async (req, res) => {
  const result = await verifyPaymentService(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Order verified successfully',
    data: result,
  });
});

export const getMyOrdersController = catchAsync(async (req, res) => {
  const result = await getMyOrdersService(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const getOrderByIdController = catchAsync(async (req, res) => {
  const result = await getOrderByIdService(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});
