import { Router } from "express";
import {
  getDistricts,
  getOneDistrict,
  updateDistrict,
  deleteDistrict,
  addDistrict,
} from "../controller/districts.controller.js";
const router = Router();
router.get("/", getDistricts);
router.get("/:id", getOneDistrict);
router.post("/", addDistrict);
router.patch("/:id", updateDistrict);
router.delete("/:id", deleteDistrict);

export { router as addressRouter };
