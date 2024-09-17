import { Strategy } from 'passport-local';
const LocalStrategy = Strategy;
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { UserService } from '../services/userService';
const LocalJWTStrategy = jwtStrategy;
const LocalExtractJWT = ExtractJwt;

export const applyPassportMiddleware = (passport) =>
{
    const nameField = 'username';
    const pwdField = 'password';

    const userService = new UserService();

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
                    return done(null, false, { path: nameField, msg: 'User not found' });
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return done(null, false, { path: pwdField, msg: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
            }
        )
    );

    passport.use(
        new LocalJWTStrategy(
            {
                secretOrKey: process.env.JWT_SECURE_KEY,
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