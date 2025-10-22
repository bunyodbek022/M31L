import { customerRouter } from "./customer.router.js";
import { Router } from "express";
const router = Router();

router.use("/customers", customerRouter);

export { router as mainRouter };
