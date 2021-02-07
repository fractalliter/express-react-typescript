
import express, {Request, Response, Router, Express} from 'express';
import bodyParser from 'body-parser';
import router from './route';

// call express
const app: Express = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port: number = Number(process.env.PORT) || 8050; // set our port

app.use(express.static('dist'));
app.get('/', (req:Request, res:Response) => {
    console.log('sending index.html');
    res.sendFile('/dist/index.html');
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
const routes: Router[] = Object.values(router);
app.use('/api', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
