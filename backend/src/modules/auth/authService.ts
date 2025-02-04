import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken, verifyToken } from '../../utils/createToken';
import { User } from '../user/userModel';
import { ILoginUser } from './authInterface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { IUser } from '../user/userInterface';

export const createUserService = async (data: IUser) => {
  const { name, email, password } = data;
  const result = await User.create({
    name,
    email,
    password,
    role: 'user',
  });
  return result;
};

export const loginUserService = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  //checking if the password is correct

  const isMatch = await bcrypt.compare(payload?.password, user?.password);
  if (!isMatch)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    name: user?.name,
    _id: user?._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.JWT_REFRESH_SECRET as string);

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    email: user.id,
    role: user.role,
    name: user.name,
    _id: user.id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  return {
    accessToken,
  };
};
