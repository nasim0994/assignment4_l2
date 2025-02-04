import { z } from 'zod';

export const carValidation = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  brand: z.string().nonempty({ message: 'Brand is required' }),
  model: z.string().nonempty({ message: 'Model is required' }),
  year: z.number().int(),
  category: z.enum(
    ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback'],
    {
      message: 'Invalid category',
    },
  ),
  description: z.string().nonempty({ message: 'Description is required' }),
  stock: z.number().int().min(0, { message: 'Quantity must be 0 or greater' }),
});

export const updateCarValidation = carValidation.partial();
