import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { UserService } from "../services/userService";
import { PassportStatic } from "passport";
import mysql from 'mysql2/promise'

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

	userController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userService = new UserService(connection);
        const userUpdate = await userService.updateUser(req.body);
        res.status(201).json(userUpdate);
    }));

	userController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const userService = new UserService(connection);
        const userInformation = await userService.loadUserById(req.params.id);
        if(userInformation !== null)
        {
            res.status(200).json(userInformation);
        } else {
            res.status(400).json({ error: 'Invalid User' })
        }
    }));

	userController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const userService = new UserService(connection);
        const userInformation = await userService.loadUserById(req.params.id);
        
        if(userInformation !== null)
        {
            const updateUser = await userService.updateUser(req.body);
            res.status(201).json(updateUser);
        } else {
            res.status(400).json({ error: 'Invalid User' })
        }
    }));

	userController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const userService = new UserService(connection);
        const userInformation = await userService.loadUserById(req.params.id);

        if(userInformation !== null)
        {
            const deleteUser = await userService.deleteUser(req.params.id);
            res.status(201).json(deleteUser);
        } else {
            res.status(400).json({ error: 'Invalid User' })
        }
    }));

    return userController;
}