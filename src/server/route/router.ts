import express, {Router} from 'express';
const router: Router = express.Router()
import middleware from '../middlewares';

// middleware to use for all requests
router.use(Object.values(middleware));

export default router;