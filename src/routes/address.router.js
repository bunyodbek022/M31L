import { Router } from 'express';
import {
  getAddress,
  getOneAddress,
  updateAddress,
  deleteAddress,
  addAddress,
} from '../controller/address.controller.js';
import { authGuard, roleGuard } from '../middleware/guard.middleware.js';
const router = Router();

router.get('/', authGuard, roleGuard('admin'), getAddress);
router.get(
  '/:id',
  authGuard,
  roleGuard('admin', 'customer', 'deliveryStaff'),
  getOneAddress,
);
router.post('/', authGuard, roleGuard('admin', 'customer'), addAddress);
router.put('/:id', authGuard, roleGuard('admin', 'customer'), updateAddress);
router.delete('/:id', authGuard, roleGuard('admin', 'customer'), deleteAddress);

export { router as addressRouter };
