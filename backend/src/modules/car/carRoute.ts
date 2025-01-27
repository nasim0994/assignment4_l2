import express from 'express';
const Router = express.Router();
import {
  createCarController,
  deleteCarController,
  getAllCarController,
  getCarByIdController,
  updateCarController,
} from './carController';
import { auth } from '../../middlewares/auth';
import verifyValidate from '../../middlewares/verifyValidate';
import { carValidation, updateCarValidation } from './carValidation';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(carValidation),
  createCarController,
);
Router.get('/all', getAllCarController);
Router.get('/:id', getCarByIdController);
Router.delete('/delete/:id', auth('admin'), deleteCarController);
Router.put(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateCarValidation),
  updateCarController,
);

export const carRoute = Router;
