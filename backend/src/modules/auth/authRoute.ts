import express from 'express';
import verifyValidate from '../../middlewares/verifyValidate';
import { loginValidation } from './authValidation';
import { createUserController, loginUserController } from './authController';
import { userValidation } from '../user/userValidation';
const Router = express.Router();

Router.post('/register', verifyValidate(userValidation), createUserController);
Router.post('/login', verifyValidate(loginValidation), loginUserController);

export const authRoute = Router;
