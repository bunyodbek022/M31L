import { Router } from 'express';
import {
  getDistricts,
  getOneDistrict,
  updateDistrict,
  deleteDistrict,
  addDistrict,
} from '../controller/districts.controller.js';
import { authGuard, roleGuard } from '../middleware/guard.middleware.js';
const router = Router();

router.use(authGuard);
router.get('/', roleGuard('amdin, deliveryStaff, customer'), getDistricts);
router.get('/:id', roleGuard('amdin, deliveryStaff, customer'), getOneDistrict);
router.post('/', roleGuard('amdin, deliveryStaff, customer'), addDistrict);
router.put('/:id', roleGuard('amdin, deliveryStaff, customer'), updateDistrict);
router.delete(
  '/:id',
  roleGuard('amdin, deliveryStaff, customer'),
  deleteDistrict,
);

export { router as districtRouter };
