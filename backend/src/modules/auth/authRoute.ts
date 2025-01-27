import express from 'express';
import verifyValidate from '../../middlewares/verifyValidate';
import { loginValidation } from './authValidation';
import {
  createUserController,
  loginUserController,
  refreshTokenController,
} from './authController';
import { userValidation } from '../user/userValidation';
const Router = express.Router();

Router.post('/register', verifyValidate(userValidation), createUserController);
Router.post('/login', verifyValidate(loginValidation), loginUserController);
Router.post('/refresh-token', refreshTokenController);

export const authRoute = Router;
