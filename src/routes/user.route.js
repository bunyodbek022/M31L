import { Router } from 'express';
import {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from '../controller/user.controller.js';
import { authGuard, roleGuard } from '../middleware/guard.middleware.js';

const router = Router();

router.get(
  '/',
  authGuard,
  roleGuard('customer', 'deliveryStaff', 'admin'),
  getUsers,
);

router.get(
  '/:id',
  authGuard,
  roleGuard('customer', 'deliveryStaff', 'admin'),
  getOneUser,
);

router.put('/:id', authGuard, roleGuard('admin', 'customer'), updateUser);

router.delete('/:id', authGuard, roleGuard('admin'), deleteUser);

export { router as userRouter };
