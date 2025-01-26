import { NextFunction, Request, Response } from 'express';
import { orderService } from './orderService';
import { IOrder } from './orderInterface';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: IOrder = req.body;

    const result = await orderService.createOrderService(data);

    res.status(200).json({
      status: true,
      message: 'Order placed successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const calculateRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderService.calculateRevenueService();

    res.status(200).json({
      status: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const orderController = {
  createOrder,
  calculateRevenue,
};
