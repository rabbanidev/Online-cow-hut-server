import express from 'express';
import { CowController } from './cow.controller';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { CowValidation } from './cow.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestHandler(CowValidation.createCowZodSchema),
  CowController.createCow
);

router.patch(
  '/:id',
  validateRequestHandler(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.delete('/:id', CowController.deleteCow);
router.get('/:id', CowController.getSingleCow);
router.get('/', CowController.getAllCows);

export const CowRoutes = router;
