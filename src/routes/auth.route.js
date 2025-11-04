import { Router } from 'express';
import { authController } from '../controller/auth.controller.js';
import {
  authGuard,
  refreshGuard,
  roleGuard,
} from '../middleware/guard.middleware.js';
import { validate } from '../validation/validation.js';
import {
  customerValidate,
  loginValidate,
} from '../validation/user.validation.js';

const router = Router();

//  Get current user profile
router.get(
  '/profile',
  authGuard,
  roleGuard('admin', 'deliveryStaff', 'customer'),
  authController.profile,
);

//  Sign in (login)
router.post('/signin', validate(loginValidate, 'body'), authController.signin);

//  Sign up (register)
router.post(
  '/signup',
  validate(customerValidate, 'body'),
  authController.signup,
);

//  Refresh access token
router.post('/refresh', refreshGuard, authController.updateAccess);

export { router as authRouter };
