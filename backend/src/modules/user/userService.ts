import { User } from './userModel';

export const getAllUserService = async () => {
  const result = await User.find().select('-password');
  return result;
};
