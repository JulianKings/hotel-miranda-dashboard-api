import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { UserService } from "../services/userService";

const users_all = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();
    res.status(200).json(userService.loadAll());
})

const users_by_id = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const userService = new UserService();
    res.status(200).json(userService.loadUserById(req.params.id));
})

const create_user = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();
    res.status(201).json(userService.updateUser(req.body));
})

const update_user = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const userService = new UserService();
    if(userService.loadUserById(req.params.id) !== null)
    {
        res.status(201).json(userService.updateUser(req.body));
    }
})

const delete_user = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const userService = new UserService();
    if(userService.loadUserById(req.params.id) !== null)
    {
        res.status(201).json(userService.deleteUser(req.params.id));
    }
})

export { users_all, users_by_id, create_user, update_user, delete_user }