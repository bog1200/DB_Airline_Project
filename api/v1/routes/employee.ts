import express from 'express';
import controller from "../controllers/employee";
const router = express.Router();

router.get('/all', controller.getEmployees);
router.get('/', controller.getEmployee);
router.get('/search', controller.searchEmployee);
router.post('/', controller.addEmployee);
router.put('/', controller.updateEmployee);
router.delete('/', controller.deleteEmployee);

export = router;
