//API Version 1
// https://{base_link}/api/v1
import express from 'express';
const router = express.Router();

import accounts from './routes/account';
//import flights from './routes/flight';


router.use('/accounts', accounts);
//router.use('/flights', flights);

export = router;
