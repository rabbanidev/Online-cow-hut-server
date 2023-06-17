import express from 'express';
import { UserController } from './user.controller';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { UserValidation } from './user.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequestHandler(UserValidation.updatedUserZodSchema),
  UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);
router.get('/:id', UserController.getSingleUser);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
