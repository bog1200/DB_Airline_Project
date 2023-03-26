import express from "express";
import controller from "../controllers/airplane_manufacturer";
const router = express.Router();

router.get("/search", controller.searchAirplaneManufacturers);
router.get("/", controller.getAirplaneManufacturer);
router.post("/", controller.addAirplaneManufacturer);
router.put("/", controller.updateAirplaneManufacturer);
router.delete("/", controller.deleteAirplaneManufacturer);

export = router;