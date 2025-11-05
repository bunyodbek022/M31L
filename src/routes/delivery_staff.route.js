import { Router } from 'express';
import { DeliveryStaffController } from '../controller/delivery_staff.controller.js';
import { authGuard, roleGuard } from '../middleware/guard.middleware.js';

const router = Router();

//  Barcha endpointlar uchun authGuard
router.use(authGuard);

//  GET all delivery staff
router.get(
  '/',
  roleGuard('customer', 'admin', 'deliveryStaff'),
  DeliveryStaffController.getAll,
);

//  GET one delivery staff (profile)
router.get(
  '/profile/:id',
  roleGuard('customer', 'admin', 'deliveryStaff'),
  DeliveryStaffController.getOne,
);

// ADD delivery staff
router.post('/', roleGuard('admin'), DeliveryStaffController.add);

//  UPDATE delivery staff
router.put(
  '/:id',
  roleGuard('admin', 'deliveryStaff'),
  DeliveryStaffController.update,
);

//  DELETE delivery staff
router.delete(
  '/:id',
  roleGuard('admin', 'deliveryStaff'),
  DeliveryStaffController.delete,
);

export { router as delivery_staffRouter };
