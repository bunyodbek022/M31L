import { Router } from 'express';
import { authRouter } from './auth.router.js';
import { addressRouter } from './address.router.js';
import { delivery_staffRouter } from './delivery_staff.router.js';
import { districtRouter } from './districts.router.js';
import { order_itemsRouter } from './order_items.router.js';
import { orderRouter } from './orders.router.js';
import { water_productRouter } from './water_products.router.js';
import { paymentRouter } from './payments.router.js';
import { userRouter } from './user.router.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/address', addressRouter);
router.use('/delivery_staff', delivery_staffRouter);
router.use('/district', districtRouter);
router.use('/order_item', order_itemsRouter);
router.use('/order', orderRouter);
router.use('/payment', paymentRouter);
router.use('/water_product', water_productRouter);
export { router as mainRouter };
