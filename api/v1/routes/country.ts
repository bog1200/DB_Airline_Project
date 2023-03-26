import express from 'express';
import controller from '../controllers/country';
const router = express.Router();

router.get('/all', controller.getCountries);
router.get('/', controller.getCountry);
router.get('/search/', controller.searchCountry);
router.post('/', controller.addCountry);
router.put('/', controller.updateCountry);
router.delete('/', controller.deleteCountry);

export = router;