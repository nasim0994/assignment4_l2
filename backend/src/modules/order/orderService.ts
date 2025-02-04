import { IOrder } from './orderInterface';
import { Order } from './orderModel';
import { Car } from '../car/carModel';
import { User } from '../user/userModel';
import { makePaymentAsync, verifyPaymentAsync } from './orderUtils';
import QueryBuilder from '../../builders/QueryBuilder';

export const createOrderService = async (
  data: Partial<IOrder>,
  client_ip: string,
) => {
  // Calculate total price
  const totalPrice = await (data?.cars?.reduce(async (accPromise, carItem) => {
    const acc = await accPromise;
    const car = await Car.findById(carItem?.car);
    if (!car) {
      throw new Error(`Car with ID ${carItem.car} not found.`);
    }
    return acc + car.price * carItem.quantity;
  }, Promise.resolve(0)) || 0);

  const orderData = {
    ...data,
    totalPrice,
  };

  const result = await Order.create(orderData as IOrder);

  const user = await User.findById(data?.user);

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: result?._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_email: user?.email,
    customer_address: data?.shippingInfo?.address,
    customer_phone: data?.shippingInfo?.phone,
    customer_city: 'N/A',
    client_ip,
  };

  const payment = await makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    await Order.findByIdAndUpdate(result?._id, {
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

export const verifyPaymentService = async (id: string) => {
  const verifiedPayment = await verifyPaymentAsync(id);

  if (verifiedPayment?.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

export const getMyOrdersService = async (userId: string) => {
  const result = await Order.find({ user: userId })
    .populate('user')
    .populate('cars.car');
  return result;
};

export const getOrderByIdService = async (id: string) => {
  const result = await Order.findById(id).populate('user').populate('cars.car');
  return result;
};

export const getAllOrdersService = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find().populate('user').populate('cars.car'),
    query,
  )
    .search([''])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await orderQuery.countTotal();
  const data = await orderQuery.modelQuery;

  return {
    meta,
    data,
  };
};

export const updateOrderStatusService = async (id: string, status: string) => {
  const result = await Order.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};

export const deleteOrderService = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};
