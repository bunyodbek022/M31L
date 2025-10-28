import { Router } from 'express';
import {
  getDelivery_staffs,
  getOneDelivery_staff,
  updateDelivery_staff,
  deleteDelivery_staff,
} from '../controller/delivery_staff.controller.js';
import { authGuard, roleGuard } from '../middleware/guard.middleware.js';

const router = Router();
router.use(authGuard);
router.get(
  '/',
  roleGuard('customer', 'admin', 'deliverStaff'),
  getDelivery_staffs,
);
router.put('/:id', roleGuard('admin', 'deliverStaff'), updateDelivery_staff);
router.delete(
  '/:id',
  roleGuard('amdin', 'deliveryStaff'),
  deleteDelivery_staff,
);

router.get('/profile/:id', getOneDelivery_staff);

export { router as delivery_staffRouter };
