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
import {
  addressValidate,
  addressUpdate,
} from '../validation/address.validation.js';
import { validate } from '../validation/validation.js';
const router = Router();

//GET All address
router.get('/', authGuard, roleGuard('admin'), getAllress);
router.get(
  '/:id',
  authGuard,
  roleGuard('admin', 'customer', 'deliveryStaff'),
  getOneAddress,
);
router.post(
  '/',
  authGuard,
  selfGuard,
  validate(addressValidate, 'body'),
  addAddress,
);
router.put(
  '/:id',
  authGuard,
  selfGuard,
  validate(addressUpdate, 'body'),
  updateAddress,
);
router.delete('/:id', authGuard, selfGuard, deleteAddress);

export { router as addressRouter };
