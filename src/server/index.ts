
import express, {Router} from 'express';
import bodyParser from 'body-parser';
import router from './route';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/test", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
    // const data = await db.collection("users").find({}).toArray()
    console.log("connect");
});
// call express
const app = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port: number = Number(process.env.PORT) || 8050; // set our port

app.use(express.static('dist'));
app.get('/', (req, res) => {
    console.log('sending index.html');
    res.sendFile('/dist/index.html');
});
// ROUTES FOR OUR API
// =============================================================================
// const router = express.Router(); // get an instance of the express Router

// // middleware to use for all requests
// router.use((req, res, next) => {
//     // do logging
//     console.log(req.method, '\t', `${req.baseUrl}${req.url}`, '\t', req.body);
//     next(); // make sure we go to the next routes and don't stop here
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
const routes: Router[] = Object.values(router);
app.use('/api', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
