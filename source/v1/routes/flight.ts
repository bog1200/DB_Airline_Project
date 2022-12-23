import express from "express";
import controller from "../controllers/flight";
const router = express.Router();
router.get("/search", controller.searchFlights);
router.get("/:id", controller.getFlights);
router.post("/", controller.addFlight);
router.delete("/:id", controller.deleteFlight);

export = router;