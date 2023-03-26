import express from "express";
import controller from "../controllers/ticket_payment_method";
const router = express.Router();

router.get('/all', controller.getTicketPaymentMethods);
router.get("/", controller.getTicketPaymentMethod);
router.get("/search", controller.searchTicketPaymentMethods);
router.put('/',controller.updateTicketPaymentMethod);
router.post("/", controller.addTicketPaymentMethod);
router.delete("/", controller.deleteTicketPaymentMethod);

export = router;