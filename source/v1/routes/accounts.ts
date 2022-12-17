import express from 'express';
import controller from '../controllers/accounts';
const router = express.Router();

//router.get('/account', controller.getAccounts);

//router.put('/accounts/:id', controller.updateAccount);
//router.delete('/accounts/:id', controller.deleteAccount);
router.get('/', controller.getAccount);
router.post("/", controller.addAccount);
router.post("/login/", controller.loginAccount);

export = router;