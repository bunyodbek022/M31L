import { Router } from 'express';
import {
  getPayments,
  getOnePayment,
  updatePayment,
  deletePayment,
  addPayment,
} from '../controller/payments.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';
const router = Router();

router.use(authGuard);
router.get('/', getPayments);
router.get('/:id', getOnePayment);
router.post('/', addPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

export { router as paymentRouter };
