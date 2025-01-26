import express from 'express';
import { updateUserStatusController } from './adminController';
import { auth } from '../../middlewares/auth';

const Router = express.Router();

Router.patch('/users/:id/block', auth('admin'), updateUserStatusController);

export const adminRoute = Router;
