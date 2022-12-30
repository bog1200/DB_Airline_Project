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
import employees from './routes/employees';
import jobs from "./routes/job";
import cities from './routes/city';
import luggage from "./routes/luggage";
import tickets from './routes/ticket';
import ticket_payments from "./routes/ticket_payment";
import ticket_payment_card from './routes/ticket_payment_card';
import ticket_payment_methods from './routes/ticket_payment_method';
import passengers from './routes/passenger';
import flight_crew from "./routes/flight_crew";


router.use('/accounts', accounts);
router.use('/flights', flights);
router.use('/airports', airports);
router.use('/account/cards', account_cards);
router.use('/airport/gates', airport_gates);
router.use('/airport/gate/types', airport_gate_types);
router.use('/employees', employees);
router.use('/jobs', jobs);
router.use('/countries', country);
router.use('/cities', cities);
router.use('/luggages', luggage);
router.use('/tickets', tickets);
router.use('/ticket/payments', ticket_payments);
router.use('/ticket/payment/cards', ticket_payment_card);
router.use('/ticket/payment/methods', ticket_payment_methods)
router.use('/passengers', passengers);
router.use('/flight/crews', flight_crew);


export = router;
