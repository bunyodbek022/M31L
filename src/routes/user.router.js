import { Router } from 'express';
import {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from '../controller/user.controller.js';
import { authGuard, roleGuard } from '../middleware/guard.middleware.js';

const router = Router();
router.get('/', roleGuard('customer', 'deliveryStaff', 'admin'), getUsers);
router.get(
  '/:id',
  authGuard,
  roleGuard('User', 'deliveryStaff', 'admin'),
  getOneUser,
);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router as userRouter };
