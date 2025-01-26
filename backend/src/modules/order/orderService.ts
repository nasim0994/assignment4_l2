import mongoose from 'mongoose';
import { CarModel } from '../car/carModel';
import { IOrder } from './orderInterface';
import Order from './orderModel';

const createOrderService = async (data: IOrder) => {
  const { email, car, quantity, totalPrice } = data;

  const session = await mongoose.startSession();
  session.startTransaction();

  // Step 1: Find the car by ID
  const carIsExist = await CarModel.findById(car);

  if (!carIsExist) {
    throw new Error('Car not found');
  }

  // Step 2: Check if there is enough stock
  if (carIsExist.quantity < quantity) {
    throw new Error('Insufficient stock available');
  }

  // Step 3: Reduce the quantity in the car model
  const updatedCar = await CarModel.findByIdAndUpdate(
    car,
    {
      $inc: { quantity: -quantity },
      $set: { inStock: carIsExist.quantity - quantity === 0 },
    },
    { new: true, session },
  );

  // If car update fails, return an error
  if (!updatedCar) {
    throw new Error('Failed to update car stock');
  }

  // Step 5: Create the new order
  const newOrder = new Order({
    email,
    car,
    quantity,
    totalPrice,
  });

  // Save the new order
  const result = await newOrder.save({ session });

  // Commit the transaction
  await session.commitTransaction();
  session.endSession();

  // Return the saved order
  return result;
};

const calculateRevenueService = async () => {
  const revenueData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return revenueData.length > 0 ? revenueData[0] : 0;
};

export const orderService = {
  createOrderService,
  calculateRevenueService,
};
