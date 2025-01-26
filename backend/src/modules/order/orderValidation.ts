import { z } from 'zod';

export const carValidation = z.object({
  car: z.string().nonempty({ message: 'Car ID is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export const shippingInfoValidation = z.object({
  address: z.string().nonempty({ message: 'Address is required' }),
  city: z.string().nonempty({ message: 'City is required' }),
  note: z.string().optional(),
});

export const paymentValidation = z.object({
  method: z.string().nonempty({ message: 'Payment method is required' }),
  transactionId: z.string().optional(),
});

export const orderValidation = z.object({
  user: z.string().nonempty({ message: 'User ID is required' }),
  cars: z
    .array(carValidation)
    .nonempty({ message: 'Cars array cannot be empty' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be 0 or greater' }),
  shippingInfo: shippingInfoValidation,
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']),
  payment: paymentValidation,
});
