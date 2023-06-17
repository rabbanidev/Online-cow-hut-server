import { Model } from 'mongoose';

type IName = {
  firstName: string;
  lastName: string;
};

export type IUserRole = 'seller' | 'buyer';

export type IUser = {
  name: IName; // embedded field
  password: string;
  role: IUserRole;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
