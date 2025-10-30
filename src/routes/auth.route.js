import { Router } from 'express';
import { authController } from '../controller/auth.controller.js';
import {
  authGuard,
  refreshGuard,
  roleGuard,
} from '../middleware/guard.middleware.js';
import { validate } from '../validation/validation.js';
import { customerValidate } from '../validation/user.validation.js';
const router = Router();

router.get(
  '/profile',
  authGuard,
  roleGuard('admin', 'deliveryStaff', 'customer'),
  authController.profile,
);
router.post('/signin', authController.signin);
router.post(
  '/signup',
  validate(customerValidate, 'body'),
  authController.signup,
);
router.post('/refresh', refreshGuard, authController.updateAccess);
// update
export { router as authRouter };
