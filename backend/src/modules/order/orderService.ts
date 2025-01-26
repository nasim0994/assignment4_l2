import mongoose from 'mongoose';
import { IOrder } from './orderInterface';
import { Order } from './orderModel';
import { CarModel } from '../car/carModel';

export const createOrderService = async (data: Partial<IOrder>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Calculate total price
    const totalPrice = await (data?.cars?.reduce(
      async (accPromise, carItem) => {
        const acc = await accPromise;
        const car = await CarModel.findById(carItem?.car);
        if (!car) {
          throw new Error(`Car with ID ${carItem.car} not found.`);
        }
        return acc + car.price * carItem.quantity;
      },
      Promise.resolve(0),
    ) || 0);

    const orderData = {
      ...data,
      totalPrice,
    };

    const result = await Order.create([orderData as IOrder], { session });

    // Update stock for each car
    const cars = data?.cars || [];
    await Promise.all(
      cars?.map(async (carItem) => {
        const car = await CarModel.findById(carItem?.car).session(session);

        if (!car) {
          throw new Error(`Car with ID ${carItem.car} not found.`);
        }

        if (car?.stock < carItem?.quantity) {
          throw new Error(`Insufficient stock for car ID ${carItem.car}.`);
        }

        car.stock -= carItem?.quantity;
        await car.save({ session });
      }),
    );

    // Commit the transaction
    await session.commitTransaction();
    return result;
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
