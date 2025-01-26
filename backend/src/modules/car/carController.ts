import {
  createCarService,
  deleteCarService,
  getAllCarService,
  getCarByIdService,
  updateCarService,
} from './carService';
import { catchAsync } from '../../utils/catchAsync';

export const createCarController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await createCarService(data);

  res.status(200).json({
    success: true,
    message: 'car created successfully',
    data: result,
  });
});

export const getAllCarController = catchAsync(async (req, res) => {
  const result = await getAllCarService(req.query);

  res.status(200).json({
    success: true,
    message: 'cars fetched successfully',
    data: result,
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

export const updateCarController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateCarService(id, data);

  res.status(200).json({
    success: true,
    message: 'car updated successfully',
    data: result,
  });
});

export const deleteCarController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteCarService(id);

  res.status(200).json({
    success: true,
    message: 'car deleted successfully',
  });
});
