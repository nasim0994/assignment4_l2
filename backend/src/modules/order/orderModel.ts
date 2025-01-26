import mongoose, { Schema } from 'mongoose';
import { IOrder } from './orderInterface';
import validator from 'validator';

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} Please provide a valid email address',
      },
    },
    car: {
      type: String,
      required: [true, 'Car ID is required'],
      validate: {
        validator: (value: string) => mongoose.Types.ObjectId.isValid(value),
        message: 'Invalid car ID',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: (value: number) => Number.isInteger(value),
        message: '{VALUE} Quantity must be an integer',
      },
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be greater than 0'],
      validate: {
        validator: (value: number) => value >= 0,
        message: '{VALUE} Total price must be a positive number',
      },
    },
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
