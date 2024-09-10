import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/userRoutes';
import contactRouter from './routes/contactRoutes';
import roomRouter from './routes/roomRoutes';

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/contact', contactRouter);
app.use('/room', roomRouter);

export default app;
