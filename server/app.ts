import dotenv from "dotenv";
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import mongoose from 'mongoose';

import indexController from './controllers/indexController';
import usersController from './controllers/userController';
import contactController from './controllers/contactController';
import roomController from './controllers/roomController';
import bookingController from './controllers/bookingController';
import loginController from './controllers/loginController';

import { applyPassportMiddleware } from './middleware/auth';
import serverless from 'serverless-http';

dotenv.config();
const app = express();

mongoose.set("strictQuery", false);

const jwtKey: string = (process.env.JWT_SECURE_KEY !== undefined) ? process.env.JWT_SECURE_KEY : 'defaultSecretKey915534b';
const mongoUri: string = (process.env.MONGODB_URI !== undefined) ? process.env.MONGODB_URI : '';

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoUri);
}

app.set('jwt_secret_password', jwtKey);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const bufferToJSONMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.body.length > 0 && req.body instanceof Buffer) {
    try {
      req.body = JSON.parse(req.body.toString());
    } catch (err) {
      return res.status(400).json({ body: req.body, length: req.body.length, error: 'Invalid JSON data' });
    }
  }

  next();
};

app.use(bufferToJSONMiddleware)

const indexRouterHandler = indexController();
app.use('/', indexRouterHandler);
const userRouterHandler = usersController(passport);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouterHandler);
const contactRouterHandler = contactController(passport);
app.use('/contact', passport.authenticate('jwt', { session: false }), contactRouterHandler);
const roomRouterHandler = roomController(passport);
app.use('/room', passport.authenticate('jwt', { session: false }), roomRouterHandler);
const bookingRouterHandler = bookingController(passport);
app.use('/bookings', passport.authenticate('jwt', { session: false }), bookingRouterHandler);
const loginRouterHandler = loginController(passport);
app.use('/login', loginRouterHandler);

applyPassportMiddleware(passport);

//app.listen(3000);

//console.log('server listening on port 3000');

export const handler = serverless(app);
