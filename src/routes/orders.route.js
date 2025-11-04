import { Router } from 'express';
import { OrderController } from '../controller/orders.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';

const router = Router();

//  Barcha endpointlar uchun authGuard
router.use(authGuard);

//  GET all orders
router.get('/', OrderController.getAll);

//  GET one order
router.get('/:id', OrderController.getOne);

//  CREATE order
router.post('/', OrderController.add);

//  UPDATE order
router.put('/:id', OrderController.update);

//  DELETE order
router.delete('/:id', OrderController.delete);

export { router as orderRouter };
