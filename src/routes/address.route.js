import { Router } from 'express';
import { AddressController } from '../controller/address.controller.js';
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
//  GET all addresses
router.get('/', authGuard, roleGuard('admin'), AddressController.getAll);
//  GET one address
router.get(
  '/:id',
  authGuard,
  roleGuard('admin', 'customer', 'deliveryStaff'),
  AddressController.getOne,
);
//  CREATE address
router.post(
  '/',
  authGuard,
  selfGuard,
  validate(addressValidate, 'body'),
  AddressController.add,
);
//  UPDATE address
router.put(
  '/:id',
  authGuard,
  selfGuard,
  validate(addressUpdate, 'body'),
  AddressController.update,
);
//  DELETE address
router.delete('/:id', authGuard, selfGuard, AddressController.delete);

export { router as addressRouter };
