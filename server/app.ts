import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/userRoutes';
import contactRouter from './routes/contactRoutes';
import roomRouter from './routes/roomRoutes';
import bookingRouter from './routes/bookingRoutes';
import loginRouter from './routes/loginRoutes';
import { applyPassport } from './middleware/auth';

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

app.use('/', indexRouter);

const userRouterHandler = usersRouter(passport);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouterHandler);
const contactRouterHandler = contactRouter(passport);
app.use('/contact', passport.authenticate('jwt', { session: false }), contactRouterHandler);
const roomRouterHandler = roomRouter(passport);
app.use('/room', passport.authenticate('jwt', { session: false }), roomRouterHandler);
const bookingRouterHandler = bookingRouter(passport);
app.use('/bookings', passport.authenticate('jwt', { session: false }), bookingRouterHandler);
const loginRouterHandler = loginRouter(passport);
app.use('/login', loginRouterHandler);

applyPassport(passport);

export default app;
