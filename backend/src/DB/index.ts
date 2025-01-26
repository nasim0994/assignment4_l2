import { IUser } from '../modules/user/userInterface';
import { User } from '../modules/user/userModel';

const defaultAdmin: IUser = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'assignment4',
  role: 'admin',
  isBlocked: false,
};

export const seedDefaultAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: 'admin' });

  if (!isSuperAdminExits) {
    const result = await User.create(defaultAdmin);
    if (result) {
      // eslint-disable-next-line no-console
      console.log('Default admin created successfully');
    }
  }
};
