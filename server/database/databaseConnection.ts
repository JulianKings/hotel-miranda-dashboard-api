import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connection = mysql.createPool({
    host: (process.env.SQL_HOST !== undefined) ? process.env.SQL_HOST : '',
    user: (process.env.SQL_USER !== undefined) ? process.env.SQL_USER : '',
    database: 'miranda',
    password: (process.env.SQL_PASSWORD !== undefined) ? process.env.SQL_PASSWORD : ''
});