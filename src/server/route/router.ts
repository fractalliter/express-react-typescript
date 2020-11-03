import express, {Router} from 'express';

interface IReqs {date: string, method: string, url: string, body: object};

const router: Router = express.Router()

const reqs: IReqs[] = [];

// middleware to use for all requests
router.use((req, res, next) => {
    const date: Date = new Date();
    reqs.push({
        date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`,
        method: req.method,
        url: `${req.baseUrl}${req.url}`,
        body: req.body
    });
    const len: number = reqs.length;
    // do logging
    console.table(reqs.length > 10 ? reqs.slice(len - 10, len).reverse() : reqs.reverse());
    next(); // make sure we go to the next routes and don't stop here
});

export default router;