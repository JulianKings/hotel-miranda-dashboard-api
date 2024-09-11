import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { UserService } from "../services/userService";

export default function (passport)
{
    const userController = Router();

    userController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userService = new UserService();
        res.status(200).json(userService.loadAll());
    }));

	userController.get('/sso', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.json({
            user: req.user
          })
    }));

	userController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userService = new UserService();
        res.status(201).json(userService.updateUser(req.body));
    }));

	userController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const userService = new UserService();
        res.status(200).json(userService.loadUserById(req.params.id));
    }));

	userController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const userService = new UserService();
        if(userService.loadUserById(req.params.id) !== null)
        {
            res.status(201).json(userService.updateUser(req.body));
        }
    }));

	userController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const userService = new UserService();
        if(userService.loadUserById(req.params.id) !== null)
        {
            res.status(201).json(userService.deleteUser(req.params.id));
        }
    }));

    return userController;
}