import {
  createCarService,
  deleteCarService,
  getAllCarService,
  getCarByIdService,
  updateCarService,
} from './carService';
import { catchAsync } from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import fs from 'fs';

export const createCarController = catchAsync(async (req, res, next) => {
  const image: string | undefined = req?.file?.filename;
  if (!image) throw new AppError(httpStatus.NOT_FOUND, 'image is required !');

  const data = {
    ...req.body,
    image: `/car/${image}`,
  };

  try {
    const result = await createCarService(data);

    res.status(200).json({
      success: true,
      message: 'car created successfully',
      data: result,
    });
  } catch (error) {
    fs.unlink(`${process.cwd()}/uploads/car/${image}`, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });
    next(error);
  }
});

export const getAllCarController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllCarService(req.query);

  res.status(200).json({
    success: true,
    message: 'cars fetched successfully',
    meta,
    data,
  });
});

export const getCarByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getCarByIdService(id);

  res.status(200).json({
    success: true,
    message: 'car fetched successfully',
    data: result,
  });
});

export const updateCarController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const image: string | undefined = req?.file?.filename;
  const data = {
    ...req.body,
    image: image ? `/car/${image}` : undefined,
  };
  try {
    const result = await updateCarService(id, data);

    res.status(200).json({
      success: true,
      message: 'car updated successfully',
      data: result,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`${process.cwd()}/uploads/car/${image}`, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      });
    }
    next(error);
  }
});

export const deleteCarController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteCarService(id);

  res.status(200).json({
    success: true,
    message: 'car deleted successfully',
  });
});
