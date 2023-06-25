import express from 'express';
import controller from '../controllers/account';
const router = express.Router();

router.get('/loginExternal', controller.loginExternalAccount);
router.get('/', controller.getAccount);

export = router;