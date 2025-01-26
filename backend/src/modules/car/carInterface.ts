export type ICar = {
  name: string;
  price: number;
  image: string;
  brand: string;
  model: string;
  year: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible' | 'Hatchback';
  description: string;
  stock: number;
};
