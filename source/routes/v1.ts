import express from 'express';
import accounts from './v1/accounts';
const router = express.Router();


router.use('/accounts', accounts);


export = router;