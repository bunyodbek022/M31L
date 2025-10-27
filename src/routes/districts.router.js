import { Router } from 'express';
import {
  getDistricts,
  getOneDistrict,
  updateDistrict,
  deleteDistrict,
  addDistrict,
} from '../controller/districts.controller.js';
import { adminOnly, protect } from '../helper/jwt.js';
const router = Router();
router.get('/', protect, adminOnly, getDistricts);
router.get('/:id', protect, getOneDistrict);
router.post('/', protect, adminOnly, addDistrict);
router.put('/:id', protect, adminOnly, updateDistrict);
router.delete('/:id', protect, adminOnly, deleteDistrict);

export { router as districtRouter };
