import express from "express";
import controller from "../controllers/airport";
const router = express.Router();

router.get("/search", controller.searchAirports);
router.get("/:id", controller.getAirport);
router.post("/", controller.addAirport);
router.delete("/:id", controller.deleteAirport);

export = router;