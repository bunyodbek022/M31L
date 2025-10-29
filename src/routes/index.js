import { Router } from 'express';
import { authRouter } from './auth.route.js';
import { addressRouter } from './address.route.js';
import { delivery_staffRouter } from './delivery_staff.route.js';
import { districtRouter } from './districts.route.js';
import { order_itemsRouter } from './order_items.route.js';
import { orderRouter } from './orders.route.js';
import { water_productRouter } from './water_products.route.js';
import { paymentRouter } from './payments.route.js';
import { userRouter } from './user.route.js';

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
