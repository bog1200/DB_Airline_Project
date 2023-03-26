import express from 'express';
import controller from '../controllers/account';
const router = express.Router();

//router.get('/account', controller.getAccounts);

//router.put('/accounts/:id', controller.updateAccount);
//router.delete('/accounts/:id', controller.deleteAccount);
router.get('/', controller.getAccount);
router.post("/", controller.addAccount);
router.put("/", controller.updateAccount);
router.post("/login/", controller.loginAccount);
router.delete("/", controller.deleteAccount);

export = router;