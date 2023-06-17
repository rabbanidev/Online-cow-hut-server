import express from 'express';
import { OrderController } from './order.controller';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestHandler(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get('/', OrderController.getAllOrders);

export const OrderRoutes = router;
