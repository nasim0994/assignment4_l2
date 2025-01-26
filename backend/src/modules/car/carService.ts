import { ICar } from './carInterface';
import { CarModel } from './carModel';

export const createCarService = async (data: ICar) => {
  const result = await CarModel.create(data);
  return result;
};

export const getAllCarService = async (searchTerm: string) => {
  let query = {};

  if (searchTerm) {
    const regex = new RegExp(`^${searchTerm}$`, 'i');
    query = {
      $or: [
        { category: { $regex: regex } },
        { brand: { $regex: regex } },
        { model: { $regex: regex } },
      ],
    };
  }

  const cars = await CarModel.find(query);
  return cars;
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
