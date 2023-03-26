import express from 'express';
import controller from '../controllers/flight_crew';
const router = express.Router();

router.get('/', controller.getFlightCrew);
router.get('/search', controller.searchFlightCrew);
router.get('/getMembers', controller.getFlightCrewMembers);
router.get('/getNoCrew', controller.getFlightNoCrewMembers);
router.post('/', controller.createFlightCrew);
router.put('/', controller.updateFlightCrew);
router.delete('/', controller.deleteFlightCrew);


export = router;