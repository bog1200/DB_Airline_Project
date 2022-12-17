import express from 'express';
import controller from '../../controllers/v1/accounts';
const router = express.Router();

//router.get('/account', controller.getAccounts);
router.get('/', controller.getAccount);
//router.put('/accounts/:id', controller.updateAccount);
//router.delete('/accounts/:id', controller.deleteAccount);
router.post("/", controller.addAccount);

export = router;