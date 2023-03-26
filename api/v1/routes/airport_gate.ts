import express from "express";
import controller from "../controllers/airport_gate";
const router = express.Router();

router.get("/search", controller.searchAirportGates);
router.get("/", controller.getAirportGate);
router.post("/", controller.addAirportGate);
router.put("/", controller.updateAirportGate);
router.delete("/", controller.deleteAirportGate);

export = router;