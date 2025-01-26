import QueryBuilder from '../../builders/QueryBuilder';
import { ICar } from './carInterface';
import { CarModel } from './carModel';

export const createCarService = async (data: ICar) => {
  const result = await CarModel.create(data);
  return result;
};

export const getAllCarService = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(CarModel.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  return result;
};

export const getCarByIdService = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};

export const updateCarService = async (
  carId: string,
  updateData: Partial<ICar>,
) => {
  const isExist = await CarModel.findById(carId);

  if (!isExist) {
    throw new Error('Car not found');
  }

  const result = await CarModel.findByIdAndUpdate(
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
  const result = await CarModel.findByIdAndDelete(id);
  return result;
};
