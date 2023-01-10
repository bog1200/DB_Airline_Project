import express from "express";
import controller from "../controllers/airplane";
const router = express.Router();

router.get("/search", controller.searchAirplanes);
router.get("/", controller.getAirplane);
router.post("/", controller.addAirplane);
router.put("/", controller.updateAirplane);
router.delete("/", controller.deleteAirplane);

export = router;