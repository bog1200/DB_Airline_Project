import express from "express";
import controller from "../controllers/airplane_type";
const router = express.Router();

router.get("/search", controller.searchAirplaneTypes);
router.get("/", controller.getAirplaneType);
router.post("/", controller.addAirplaneType);
router.put("/", controller.updateAirplaneType);
router.delete("/", controller.deleteAirplaneType);

export = router;