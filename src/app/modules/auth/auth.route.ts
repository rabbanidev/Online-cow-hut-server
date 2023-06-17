import express from 'express';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequestHandler(UserValidation.createUserZodSchema),
  AuthController.signup
);

export const AuthRoutes = router;
