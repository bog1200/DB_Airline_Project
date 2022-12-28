import express from 'express';
import controller from '../controllers/luggage';
const router = express.Router();

router.get('/', controller.getLuggage);
router.get('/special', controller.getSpecialLuggages);
router.get('/search', controller.getLuggages);
router.post('/', controller.addLuggage);
router.delete('/', controller.deleteLuggage);

export = router;
