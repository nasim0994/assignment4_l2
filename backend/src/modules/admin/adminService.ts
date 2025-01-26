import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/userModel';

export const updateUserStatusService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');

  user.isBlocked = true;
  const result = await user.save();

  if (!result)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user status',
    );

  return result;
};
