import { Router } from 'express';
import {
  getOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
  addOrder,
} from '../controller/orders.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';
const router = Router();

router.use(authGuard);
router.get('/', getOrders);
router.get('/:id', getOneOrder);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export { router as orderRouter };
