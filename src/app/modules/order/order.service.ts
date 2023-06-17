import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './order.interface';
import { buyerDetails, cowDetails, sellerDetails } from './order.utils';
import { labels } from '../cow/cow.constant';
import Cow from '../cow/cow.model';
import User from '../user/user.model';
import Order from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const buyer = await buyerDetails(payload.buyer.toString());
  const cow = await cowDetails(payload.cow.toString());
  const seller = await sellerDetails(cow.seller.toString());

  //   Check buyer budget in their account to buy the cow
  if (buyer.budget < cow.price) {
    throw new ApiError(
      400,
      "You can't buy the cow.Because your budget is too low!"
    );
  }

  const buyerNewBudget = buyer.budget - cow.price;
  const sellerNewIncome = cow.price + seller.income;

  let updatedOrder = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await Cow.findByIdAndUpdate(payload.cow, { label: labels[1] }, { session }); // cow label field update
    await User.findByIdAndUpdate(
      payload.buyer,
      { budget: buyerNewBudget },
      { session }
    ); // buyer budget update
    await User.findByIdAndUpdate(
      cow.seller,
      { income: sellerNewIncome },
      { session }
    ); // seller income update
    const orderArray = await Order.create([payload], { session });

    updatedOrder = orderArray[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  const order = await Order.findById(updatedOrder._id)
    .populate({
      path: 'cow',
      populate: { path: 'seller' },
    })
    .populate('buyer');

  return order;
};

const getAllOrders = async (): Promise<IOrder[]> => {
  const result = await Order.find()
    .populate({
      path: 'cow',
      populate: { path: 'seller' },
    })
    .populate('buyer');
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
