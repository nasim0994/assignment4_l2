import mongoose, { Schema } from 'mongoose';
import { ICars, IOrder, IShippingInfo } from './orderInterface';

// Car Schema
const carSchema = new Schema<ICars>({
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
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
  note: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
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
    transaction: {
      id: {
        type: String,
      },
      transactionStatus: {
        type: String,
      },
      bank_status: {
        type: String,
      },
      sp_code: {
        type: String,
      },
      sp_message: {
        type: String,
      },
      method: {
        type: String,
      },
      date_time: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
