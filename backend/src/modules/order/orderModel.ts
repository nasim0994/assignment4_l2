import mongoose, { Schema } from 'mongoose';
import { ICars, IOrder, IPayment, IShippingInfo } from './orderInterface';

// Car Schema
const carSchema = new Schema<ICars>({
  car: {
    type: Schema.Types.ObjectId,
    ref: 'CarModel',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Shipping Info Schema
const shippingInfoSchema = new Schema<IShippingInfo>({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
});

// Payment Schema
const paymentSchema = new Schema<IPayment>({
  method: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    default: null,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cars: {
      type: [carSchema],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingInfo: {
      type: shippingInfoSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    payment: {
      type: paymentSchema,
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
