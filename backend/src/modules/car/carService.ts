import QueryBuilder from '../../builders/QueryBuilder';
import { ICar } from './carInterface';
import { Car } from './carModel';

export const createCarService = async (data: ICar) => {
  const result = await Car.create(data);
  return result;
};

export const getAllCarService = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(Car.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await carQuery.countTotal();
  const data = await carQuery.modelQuery;

  return {
    meta,
    data,
  };
};

export const getCarByIdService = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

export const updateCarService = async (
  carId: string,
  updateData: Partial<ICar>,
) => {
  const isExist = await Car.findById(carId);

  if (!isExist) {
    throw new Error('Car not found');
  }

  const result = await Car.findByIdAndUpdate(
    carId,
    {
      $set: updateData,
      $currentDate: { updatedAt: true },
    },
    { new: true },
  );

  return result;
};

export const deleteCarService = async (id: string) => {
  const result = await Car.findByIdAndDelete(id);
  return result;
};
