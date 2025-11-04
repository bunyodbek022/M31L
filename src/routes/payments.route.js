import { Router } from 'express';
import { PaymentController } from '../controller/payments.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';

const router = Router();

//  Barcha endpointlar uchun authGuard
router.use(authGuard);

//  GET all payments
router.get('/', PaymentController.getAll);

//  GET one payment
router.get('/:id', PaymentController.getOne);

//  CREATE payment
router.post('/', PaymentController.add);

//  UPDATE payment
router.put('/:id', PaymentController.update);

//  DELETE payment
router.delete('/:id', PaymentController.delete);

export { router as paymentRouter };
