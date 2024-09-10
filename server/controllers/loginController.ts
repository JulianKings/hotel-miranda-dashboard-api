import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';

export default function(passport) {
    return {
        post_login: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate(
                'login',
                async (err, user, info) => {
                    try {
                        if (err) {
                            const error = new Error('An error occurred.');
                
                            return next(error);
                        }

                        if(user === false)
                        {
                            // send response with errors
                            const responseObject = {
                                responseStatus: 'failedLogin',
                                errors: [info]
                            }
                            return res.json(responseObject);
                        }
                
                        req.login(
                            user,
                            { session: false },
                            async (error) => {
                            if (error) return next(error);
                
                            const userBody = { ...user,
                                password: undefined
                             };
                            const token = jwt.sign({ user: userBody }, req.app.settings.jwt_secret_password, { expiresIn: '2h' });
                
                            return res.json({ responseStatus: 'validLogin', token: token });
                            }
                        );
                    } catch (error) {
                        return next(error);
                    }
                }
            )(req, res, next);
        })
    }
}