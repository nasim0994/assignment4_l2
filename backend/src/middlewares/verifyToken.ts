import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../modules/user/userModel';
import config from '../config';
import { catchAsync } from '../utils/catchAsync';

export const verifyToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token)
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not logged in');

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;

    const user = await User.findOne({ email: decoded?.email });

    if (!user)
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');

    // checking if the user is blocked
    const isBlocked = user?.isBlocked;
    if (isBlocked)
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');

    req.user = user;
    next();
  },
);
