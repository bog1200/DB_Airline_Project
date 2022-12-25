//API Version 1
// https://{base_link}/api/v1
import express from 'express';
const router = express.Router();

import accounts from './routes/account';
import flights from './routes/flight';
import airports from './routes/airport';
import airport_gates from './routes/airport_gate';


router.use('/accounts', accounts);
router.use('/flights', flights);
router.use('/airports', airports);
router.use('/airport/gates', airport_gates);

export = router;
