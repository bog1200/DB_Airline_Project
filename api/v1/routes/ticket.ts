import express from 'express';
import controller from '../controllers/ticket';
const router = express.Router();

router.get('/', controller.getTicket);
router.get('/search', controller.searchTickets);
router.post('/', controller.addTicket);
router.delete('/', controller.deleteTicket);


export = router;
