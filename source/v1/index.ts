//API Version 1
// https://{base_link}/api/v1
import express from 'express';
const router = express.Router();

import accounts from './routes/account';
import flights from './routes/flight';
import airports from './routes/airport';
import account_cards from './routes/account_card';
import airport_gates from './routes/airport_gate';
import country from "./routes/country";
import airport_gate_types from './routes/airport_gate_type';
import jobs from "./routes/job";
import cities from './routes/city';


router.use('/accounts', accounts);
router.use('/flights', flights);
router.use('/airports', airports);
router.use('/account/cards', account_cards);
router.use('/airport/gates', airport_gates);
router.use('/jobs', jobs);
router.use('/countries', country);
router.use('/cities', cities);


export = router;
