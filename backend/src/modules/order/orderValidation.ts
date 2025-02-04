import { z } from 'zod';

export const carValidation = z.object({
  car: z.string().nonempty({ message: 'Car ID is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export const shippingInfoValidation = z.object({
  address: z.string().nonempty({ message: 'Address is required' }),
  phone: z.string().nonempty({ message: 'Phone is required' }),
  note: z.string().optional(),
  charge: z.number().min(1, { message: 'Shipping Charge is required' }),
});

export const orderValidation = z.object({
  user: z.string().nonempty({ message: 'User ID is required' }),
  cars: z
    .array(carValidation)
    .nonempty({ message: 'Cars array cannot be empty' }),
  shippingInfo: shippingInfoValidation,
});
