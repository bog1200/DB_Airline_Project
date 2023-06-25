//API Version 2
// https://{base_link}/api/v2
import express from 'express';
const router = express.Router();
import v1 from '../v1';

import accounts from './routes/account';



router.use('/accounts', accounts);

// wildcard route for unimplemented routes
router.use(v1);



export = router;
