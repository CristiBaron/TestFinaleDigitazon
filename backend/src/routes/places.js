import express from "express";
import {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  ratePlace,
  deletePlace,
} from "../controllers/places.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { checkOwner } from "../middlewares/checkOwner.js";

const router = express.Router();

router.get("/", getPlaces);
router.post("/", authenticateUser, createPlace);
router.put("/:id", authenticateUser, checkOwner, updatePlace);
router.put("/:id/rate", authenticateUser, ratePlace);
router.get("/:id", getPlace);
router.delete("/:id", authenticateUser, checkOwner, deletePlace);

export default router;
