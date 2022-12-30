import express from 'express';
import controller from '../controllers/passenger';
const router = express.Router();

router.get('/', controller.getPassenger);
router.get('/search', controller.getPassengersByFlight);
router.post('/', controller.addPassenger);
router.put('/', controller.updatePassenger);
router.delete('/', controller.deletePassenger);


export = router;