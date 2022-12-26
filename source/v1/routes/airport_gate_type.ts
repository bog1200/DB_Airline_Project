import express from "express";
import controller from "../controllers/airport_gate_type";
const router = express.Router();

router.get("/search", controller.searchAirportGateTypes);
router.get("/", controller.getAirportGateType);
router.post("/", controller.addAirportGateType);
router.delete("/", controller.deleteAirportGateType);

export = router;