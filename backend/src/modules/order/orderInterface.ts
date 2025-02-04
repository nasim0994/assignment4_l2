import { Types } from 'mongoose';

export type ICars = {
  car: Types.ObjectId;
  quantity: number;
};

export type IShippingInfo = {
  address: string;
  note?: string;
  phone: string;
  charge: number;
};

export type IOrder = {
  user: Types.ObjectId;
  cars: ICars[];
  totalPrice: number;
  shippingInfo: IShippingInfo;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
};
