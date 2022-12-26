//API Version 1
// https://{base_link}/api/v1
import express from 'express';
const router = express.Router();

import accounts from './routes/account';
import flights from './routes/flight';
import airports from './routes/airport';
import account_cards from './routes/account_card';
import airport_gates from './routes/airport_gate';
import airport_gate_types from './routes/airport_gate_type';


router.use('/accounts', accounts);
router.use('/flights', flights);
router.use('/airports', airports);
router.use('/account/cards', account_cards);
router.use('/airport/gates', airport_gates);
router.use('/airport/gates/types', airport_gate_types);

export = router;
