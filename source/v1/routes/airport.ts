import express from "express";
import controller from "../controllers/airport";
const router = express.Router();

router.get("/search", controller.searchAirports);
router.get("/", controller.getAirport);
router.post("/", controller.addAirport);
router.delete("/", controller.deleteAirport);

export = router;