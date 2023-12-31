"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_utils_1 = require("./order.utils");
const cow_constant_1 = require("../cow/cow.constant");
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield (0, order_utils_1.buyerDetails)(payload.buyer.toString());
    const cow = yield (0, order_utils_1.cowDetails)(payload.cow.toString());
    const seller = yield (0, order_utils_1.sellerDetails)(cow.seller.toString());
    //   Check buyer budget in their account to buy the cow
    if (buyer.budget < cow.price) {
        throw new ApiError_1.default(400, "You can't buy the cow.Because your budget is too low!");
    }
    const buyerNewBudget = buyer.budget - cow.price;
    const sellerNewIncome = cow.price + seller.income;
    let updatedOrder = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield cow_model_1.default.findByIdAndUpdate(payload.cow, { label: cow_constant_1.labels[1] }, { session }); // cow label field update
        yield user_model_1.default.findByIdAndUpdate(payload.buyer, { budget: buyerNewBudget }, { session }); // buyer budget update
        yield user_model_1.default.findByIdAndUpdate(cow.seller, { income: sellerNewIncome }, { session }); // seller income update
        const orderArray = yield order_model_1.default.create([payload], { session });
        updatedOrder = orderArray[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    const order = yield order_model_1.default.findById(updatedOrder._id)
        .populate({
        path: 'cow',
        populate: { path: 'seller' },
    })
        .populate('buyer');
    return order;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find()
        .populate({
        path: 'cow',
        populate: { path: 'seller' },
    })
        .populate('buyer');
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
