import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.inteface';
import User from '../user/user.model';

const signup = async (payload: IUser): Promise<IUser | null> => {
  if (payload.role === 'buyer' && !payload.budget) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Your budget must be greater then 0!'
    );
  }

  if (payload.role === 'seller') {
    payload.budget = 0;
  }

  payload.income = 0;

  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  signup,
};
