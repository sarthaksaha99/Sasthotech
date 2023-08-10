import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// Middlewares
import {notFoundError, errorHandler} from './middleware/errorHandler.js';
import routes from './routes/index.js';

// ENV 
const {
    COOKIE_SECRET,
    CLIENT_URL
} = process.env;

// Create express App
const app = express();

// Setup Cookie parser
app.use(cookieParser(COOKIE_SECRET));

// Setup cors
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));


// Setup express middlewares'
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Setup Middleware
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());

// Image static files
// app.use('/image', express.static(path.resolve('data/image')));

// Main Routes
app.use(`/api/v1`, routes);


// Not Found and Error handler
app.use(notFoundError);
app.use(errorHandler);

export default app;