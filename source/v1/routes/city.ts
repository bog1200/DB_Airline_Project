import express from "express";
import controller from "../controllers/city";
const router = express.Router();

router.get("/search", controller.searchCity);
router.get("/", controller.getCity);
router.post("/", controller.addCity);
router.put("/", controller.updateCity);
router.delete("/", controller.deleteCity);

export = router;