import express from "express";
import controller from "../controllers/flight";
const router = express.Router();
router.get("/search", controller.searchFlights);
router.get("/", controller.getFlight);
router.post("/", controller.addFlight);
router.delete("/", controller.deleteFlight);

export = router;