//API Version 1
// https://{base_link}/api/v1
import express from 'express';
const router = express.Router();

import accounts from './routes/accounts';


router.use('/accounts', accounts);


export = router;