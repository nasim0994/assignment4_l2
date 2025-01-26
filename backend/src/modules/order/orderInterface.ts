export type ICars = {
  car: string;
  quantity: number;
};

export type IShippingInfo = {
  address: string;
  city: string;
  note?: string;
};

export type IPayment = {
  method: string;
  transactionId?: string;
};

export type IOrder = {
  user: string;
  cars: ICars[];
  totalPrice: number;
  shippingInfo: IShippingInfo;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  payment: IPayment;
};
