import express from "express";
import {
  addDeliveryAddress,
  addPickupAddress,
  deleteDeliveryAddress,
  deletePickupAddress,
  getDeliveryAddress,
  getPickupAddress,
  updateDeliveryAddress,
  updatePickupAddress,
} from "../controller/address.controller.js";

const router = express.Router();

router.get("/pickup", getPickupAddress);
router.post("/pickup", addPickupAddress);
router.put("/pickup", updatePickupAddress);
router.delete("/pickup", deletePickupAddress);

router.get("/delivery", getDeliveryAddress);
router.post("/delivery", addDeliveryAddress);
router.put("/delivery", updateDeliveryAddress);
router.delete("/delivery", deleteDeliveryAddress);

export default router;
