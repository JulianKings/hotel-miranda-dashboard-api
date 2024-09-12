import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";

export default function ()
{
    const indexController = Router();

    indexController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const welcomeObject = {
            name: 'Hotel Miranda',
            routes: [
                [
                    '/user GET',
                    '/user POST',
                    '/user/sso GET',
                    '/user/:id GET',
                    '/user/:id PUT',
                    '/user/:id DELETE',
                ],
                [
                    '/login POST',
                ],
                [
                    '/api-docs GET',
                ],
                [
                    '/contact GET',
                    '/contact POST',
                    '/contact/:id GET',
                    '/contact/:id PUT',
                    '/contact/:id DELETE',
                ],
                [
                    '/booking GET',
                    '/booking POST',
                    '/booking/:id GET',
                    '/booking/:id PUT',
                    '/booking/:id DELETE',
                ],
                [
                    '/room GET',
                    '/room POST',
                    '/room/:id GET',
                    '/room/:id PUT',
                    '/room/:id DELETE',
                ]
            ]
          }
        
          res.json(welcomeObject);
    }));

    return indexController;
}