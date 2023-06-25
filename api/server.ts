import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import v1 from './v1';
import v1docs from './v1/docs';
import v2 from './v2';
import v2docs from './v2/docs';


const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, DELETE, POST, PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/api/v1/', v1);
router.use('/api/v1/docs',v1docs);

router.use('/api/v2/', v2);
router.use('/api/v2/docs',v2docs);

/** Error handling */
router.use((req, res, next) => {
    // console.log(req);
    return res.status(204);
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));