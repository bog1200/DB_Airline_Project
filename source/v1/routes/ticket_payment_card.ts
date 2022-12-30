import express from "express";
import controller from "../controllers/ticket_payment_card";
const router = express.Router();

router.get("/all", controller.getTicketPaymentsCard);
router.get("/", controller.getTicketPaymentCard);
router.get("/search", controller.searchTicketPaymentCard);
router.post("/", controller.addTicketPaymentCard);
router.delete("/", controller.deleteTicketPaymentCard);

export = router;