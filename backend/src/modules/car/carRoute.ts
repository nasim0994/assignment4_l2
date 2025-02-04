import express, { NextFunction, Request, Response } from 'express';
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
import { fileUploader } from '../../utils/fileUploader';
const upload = fileUploader('car').single('file');

Router.post(
  '/add',
  auth('admin'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  verifyValidate(carValidation),
  createCarController,
);
Router.get('/all', getAllCarController);
Router.get('/:id', getCarByIdController);
Router.delete('/delete/:id', auth('admin'), deleteCarController);
Router.put(
  '/update/:id',
  auth('admin'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  verifyValidate(updateCarValidation),
  updateCarController,
);

export const carRoute = Router;
