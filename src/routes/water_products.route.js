import { Router } from 'express';
import { WaterProductController } from '../controller/water_products.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';

const router = Router();

//  Barcha endpointlar uchun authGuard
router.use(authGuard);

//  GET all water products
router.get('/', WaterProductController.getAll);

//  GET one water product
router.get('/:id', WaterProductController.getOne);

//  CREATE water product
router.post('/', WaterProductController.add);

//  UPDATE water product
router.put('/:id', WaterProductController.update);

//  DELETE water product
router.delete('/:id', WaterProductController.delete);

export { router as water_productRouter };
