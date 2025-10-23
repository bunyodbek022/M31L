import { Router } from "express";
import { customerRouter } from "./customer.router.js";
import { addressRouter } from "./address.router.js";
const router = Router();

router.use("/customers", customerRouter);
router.use("/address", addressRouter);

export { router as mainRouter };
