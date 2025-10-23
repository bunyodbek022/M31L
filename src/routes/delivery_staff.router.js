import { Router } from "express";
import {
  getDelivery_staffs,
  getOneDelivery_staff,
  addDelivery_staff,
  updateDelivery_staff,
  deleteDelivery_staff,
} from "../controller/delivery_staff.controller.js";
const router = Router();
router.get("/", getDelivery_staffs);
router.get("/:id", getOneDelivery_staff);
router.post("/", addDelivery_staff);
router.patch("/:id", updateDelivery_staff);
router.delete("/:id", deleteDelivery_staff);

export { router as addressRouter };
