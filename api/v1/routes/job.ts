import express from 'express';
import controller from '../controllers/job';
const router = express.Router();

router.get('/all', controller.getJobs);
router.get('/', controller.getJob);
router.get('/search/', controller.searchJob);
router.put('/',controller.updateJob);
router.post('/', controller.addJob);
router.delete('/', controller.deleteJob);

export = router;
