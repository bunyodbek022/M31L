import { Router } from "express";
import {
  getCustomers,
  getOneCustomer,
  updateCustomer,
  deleteCustomer,
  addCustomer,
} from "../controller/customer.js";
const router = Router();
router.get("/", getCustomers);
router.get("/:id", getOneCustomer);
router.post("/", addCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export { router as customerRouter };
