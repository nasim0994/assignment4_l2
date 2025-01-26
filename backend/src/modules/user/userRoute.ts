import express from 'express';
import { getAllUserController } from './userController';
import { auth } from '../../middlewares/auth';
const Router = express.Router();

Router.get('/all', auth('admin'), getAllUserController);

export const userRoute = Router;
