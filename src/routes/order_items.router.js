import { Router } from 'express';
import {
  getOrder_items,
  getOneOrder_item,
  updateOrder_item,
  deleteOrder_item,
  addOrder_item,
} from '../controller/order_items.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';
const router = Router();

router.use(authGuard);

router.get('/', getOrder_items);
router.get('/:id', getOneOrder_item);
router.post('/', addOrder_item);
router.put('/:id', updateOrder_item);
router.delete('/:id', deleteOrder_item);

export { router as order_itemsRouter };
