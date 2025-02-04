import { IOrder } from './orderInterface';
import { Order } from './orderModel';
import { CarModel } from '../car/carModel';
import { User } from '../user/userModel';
import { makePaymentAsync, verifyPaymentAsync } from './orderUtils';

export const createOrderService = async (
  data: Partial<IOrder>,
  client_ip: string,
) => {
  // Calculate total price
  const totalPrice = await (data?.cars?.reduce(async (accPromise, carItem) => {
    const acc = await accPromise;
    const car = await CarModel.findById(carItem?.car);
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
