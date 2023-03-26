import express from "express";
import controller from "../controllers/account_card";
const router = express.Router();

//router.put('/accountsCard/:id', controller.updateAccountCard);
//router.delete('/accountsCard/:id', controller.deleteAccountCard);
router.get("/", controller.getAccountCard);
router.post("/", controller.addAccountCard);
router.delete("/", controller.deleteAccountCard);

export = router;