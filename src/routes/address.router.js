import { Router } from "express";
import {
  getAddress,
  getOneAddress,
  updateAddress,
  deleteAddress,
  addAddress,
} from "../controller/address.controller.js";
const router = Router();
router.get("/", getAddress);
router.get("/:id", getOneAddress);
router.post("/", addAddress);
router.patch("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export { router as addressRouter };
