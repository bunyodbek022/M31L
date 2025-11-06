import { Router } from 'express';
import { DistrictController } from '../controller/districts.controller.js';
import { authGuard, roleGuard } from '../middleware/guard.middleware.js';

const router = Router();

//  Barcha endpointlar uchun authGuard
router.use(authGuard);

//  GET all districts
router.get(
  '/',
  roleGuard('admin', 'deliveryStaff', 'customer'),
  DistrictController.getAll,
);

//  GET one district
router.get(
  '/:id',
  roleGuard('admin', 'deliveryStaff', 'customer'),
  DistrictController.getOne,
);

//  CREATE district
router.post('/', roleGuard('admin'), DistrictController.add);

//  UPDATE district
router.put('/:id', roleGuard('admin'), DistrictController.update);

//  DELETE district
router.delete('/:id', roleGuard('admin'), DistrictController.delete);

export { router as districtRouter };
