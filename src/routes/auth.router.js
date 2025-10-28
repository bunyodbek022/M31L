import { Router } from 'express';
import { authController } from '../controller/auth.controller.js';
import { authGuard, roleGuard } from '../middleware/guard.middleware.js';
const router = Router();
router.use(authGuard, roleGuard('amdin, deliveryStaff, customer'));
router.get('/profile', authController.profile);
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/refresh', authController.updateAccess);
// update
export { router as authRouter };
