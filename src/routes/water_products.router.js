import { Router } from 'express';
import {
  getWater_products,
  getOneWater_product,
  updateWater_product,
  deleteWater_product,
  addWater_product,
} from '../controller/water_products.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';
const router = Router();

router.use(authGuard);
router.get('/', getWater_products);
router.get('/:id', getOneWater_product);
router.post('/', addWater_product);
router.put('/:id', updateWater_product);
router.delete('/:id', deleteWater_product);

export { router as water_productRouter };
