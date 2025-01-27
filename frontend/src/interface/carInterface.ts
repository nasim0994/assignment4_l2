export interface ICar {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  description: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductCardProps {
  car: ICar;
}
