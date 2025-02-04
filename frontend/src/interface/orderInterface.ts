export type ICars = {
  car: {
    _id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    brand: string;
    year: number;
  };
  quantity: number;
};

export type IShippingInfo = {
  address: string;
  note?: string;
  phone: string;
  charge: number;
};

export type IOrder = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  cars: ICars[];
  totalPrice: number;
  shippingInfo: IShippingInfo;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
