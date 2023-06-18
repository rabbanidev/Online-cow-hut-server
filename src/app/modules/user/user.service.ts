import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.inteface';
import User from './user.model';

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const exitUser = await User.findById(id);
  if (!exitUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { name, ...userData } = payload;
  // Dynamic name handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      exitUser.name[key as keyof typeof name] = name[key as keyof typeof name]; // exit.name.fistName=user given input
    });
  }

  Object.assign(exitUser, userData);
  const result = await exitUser.save();
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
