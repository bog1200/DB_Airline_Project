import express from "express";
import controller from "../controllers/airport_gate_type";
const router = express.Router();

router.get("/", controller.getAirportGateType);
router.post("/", controller.addAirportGateType);
router.put("/", controller.updateAirportGateType);
router.delete("/", controller.deleteAirportGateType);

export = router;