import express, { Router } from 'express';
import middleware from '../middlewares';

const router: Router = express.Router();

// middleware to use for all requests
router.use(Object.values(middleware));

export default router;
