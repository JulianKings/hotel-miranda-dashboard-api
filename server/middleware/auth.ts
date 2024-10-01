import { IVerifyOptions, Strategy } from 'passport-local';
const LocalStrategy = Strategy;
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { UserService } from '../services/userService';
import { PassportStatic } from 'passport';
import mysql from 'mysql2/promise';
const LocalJWTStrategy = jwtStrategy;
const LocalExtractJWT = ExtractJwt;

export const applyPassportMiddleware = (passport: PassportStatic, connection: mysql.Connection) =>
{
    const nameField = 'username';
    const pwdField = 'password';

    const userService = new UserService(connection);

    passport.use(
        'login',
        new LocalStrategy(
            {
            usernameField: nameField,
            passwordField: pwdField
            },
            async (name, password, done) => {
            try {
                const user = await userService.loadUserByName(name);

                if (!user) {
                    return done(null, false, { path: nameField, msg: 'User not found' } as unknown as IVerifyOptions);
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return done(null, false, { path: pwdField, msg: 'Wrong Password' }  as unknown as IVerifyOptions);
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
            }
        )
    );

    const jwtKey = (process.env.JWT_SECURE_KEY !== undefined) ? process.env.JWT_SECURE_KEY : '790sdfg9sdf87g9sfd879d8fs7d9sf8s9fd';

    passport.use(
        new LocalJWTStrategy(
            {
                secretOrKey: jwtKey,
                jwtFromRequest: LocalExtractJWT.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
            }
        )
    );    
}