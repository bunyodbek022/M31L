import { Router } from 'express';
import {
  getAllress,
  getOneAddress,
  updateAddress,
  deleteAddress,
  addAddress,
} from '../controller/address.controller.js';
import {
  authGuard,
  roleGuard,
  selfGuard,
} from '../middleware/guard.middleware.js';
const router = Router();

//GET All address
router.get('/', authGuard, roleGuard('admin'), getAllress);
router.get(
  '/:id',
  authGuard,
  roleGuard('admin', 'customer', 'deliveryStaff'),
  getOneAddress,
);
router.post('/', authGuard, selfGuard, addAddress);
router.put('/:id', authGuard, selfGuard, updateAddress);
router.delete('/:id', authGuard, selfGuard, deleteAddress);

export { router as addressRouter };
