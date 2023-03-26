import express from "express";
import controller from "../controllers/ticket_payment";
const router = express.Router();

router.get("/all", controller.getTicketPayments);
router.get("/", controller.getTicketPayment);
router.get("/search", controller.searchTicketPayments);
router.post("/", controller.addTicketPayment);
router.delete("/", controller.deleteTicketPayment);

export = router;