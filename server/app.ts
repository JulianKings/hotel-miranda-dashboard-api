import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexController from './controllers/indexController';
import usersController from './controllers/userController';
import contactController from './controllers/contactController';
import roomController from './controllers/roomController';
import bookingController from './controllers/bookingController';
import loginController from './controllers/loginController';
import { applyPassportMiddleware } from './middleware/auth';

var app = express();

app.set('jwt_secret_password', process.env.JWT_SECURE_KEY);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());

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

export default app;
