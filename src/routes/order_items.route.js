import { Router } from 'express';
import { OrderItemController } from '../controller/order_items.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';

const router = Router();

//  Barcha endpointlar uchun authGuard
router.use(authGuard);

//  GET all order items
router.get('/', OrderItemController.getAll);

//  GET one order item
router.get('/:id', OrderItemController.getOne);

//  CREATE order item
router.post('/', OrderItemController.add);

//  UPDATE order item
router.put('/:id', OrderItemController.update);

//  DELETE order item
router.delete('/:id', OrderItemController.delete);

export { router as order_itemsRouter };
