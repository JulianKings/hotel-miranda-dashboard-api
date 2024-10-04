import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { UserService } from "../services/userService";
import { PassportStatic } from "passport";
import mysql from 'mysql2/promise'
import { body, validationResult } from "express-validator";
import { isValidId } from "../util/dataValidation";

export default function (connection: mysql.Connection, passport: PassportStatic)
{
    const userController = Router();

    userController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userService = new UserService(connection);
        const allUsersResult = await userService.loadAll();
        res.status(200).json(allUsersResult);
    }));

	userController.get('/sso', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if(req.user !== null)
        {
            res.status(200).json({ user: req.user })
        } else {
            res.status(400).json({ error: 'Invalid user logged in'});
        }
    }));

	userController.post('/', [
        body("name", "User name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("full_name", "User full name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),  
        body("mail", "User mail must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("profile_picture", "User profile picture must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("start", "User start date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("description", "User description must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("contact", "User contact must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("status", "User status must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("position", "User position must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),

        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                const userService = new UserService(connection);
                const userUpdate = await userService.updateUser(req.body);
                res.status(201).json(userUpdate);
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

	userController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const userService = new UserService(connection);
            const userInformation = await userService.loadUserById(req.params.id);
            if(userInformation !== null)
            {
                res.status(200).json(userInformation);
            } else {
                res.status(400).json({ error: 'Invalid User' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

	userController.put('/:id', [
        body("name", "User name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("full_name", "User full name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),  
        body("mail", "User mail must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .isEmail()
            .withMessage("User mail must be valid"),
        body("profile_picture", "User profile picture must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("start", "User start date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("description", "User description must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("contact", "User contact must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("status", "User status must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("position", "User position must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),

            
        expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                if(isValidId(req.params.id))
                {
                    const userService = new UserService(connection);
                    const userInformation = await userService.loadUserById(req.params.id);
                    
                    if(userInformation !== null)
                    {
                        const updateUser = await userService.updateUser(req.body);
                        res.status(201).json(updateUser);
                    } else {
                        res.status(400).json({ error: 'Invalid User' })
                    }
                } else {
                    res.status(400).json({ error: 'Invalid Id' })
                }
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

	userController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const userService = new UserService(connection);
            const userInformation = await userService.loadUserById(req.params.id);

            if(userInformation !== null)
            {
                const deleteUser = await userService.deleteUser(req.params.id);
                res.status(201).json(deleteUser);
            } else {
                res.status(400).json({ error: 'Invalid User' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    return userController;
}