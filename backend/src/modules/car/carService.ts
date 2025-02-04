import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { ICar } from './carInterface';
import { Car } from './carModel';
import fs from 'fs';
import httpStatus from 'http-status';

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

export const updateCarService = async (id: string, data: Partial<ICar>) => {
  const isExist = await Car.findById(id);

  if (!isExist) {
    fs.unlink(`${process.cwd()}/uploads/${data?.image}`, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const result = await Car.findByIdAndUpdate(id, data, { new: true });

  if (result && data?.image && isExist?.image) {
    fs.unlink(`${process.cwd()}/uploads/${isExist?.image}`, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });
  }

  return result;
};

export const deleteCarService = async (id: string) => {
  const result = await Car.findByIdAndDelete(id);
  if (result?.image) {
    fs.unlink(`${process.cwd()}/uploads/${result?.image}`, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });
  }
  return result;
};
