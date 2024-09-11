import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { RoomService } from "../services/roomService";

export default function (passport)
{
    const roomController = Router();

    roomController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        res.status(200).json(roomService.loadAll());
    }));

    roomController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        res.status(201).json(roomService.updateRoom(req.body));
    }));

    roomController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        res.status(200).json(roomService.loadRoomById(req.params.id));
    }));

    roomController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        if(roomService.loadRoomById(req.params.id) !== null)
        {
            res.status(201).json(roomService.updateRoom(req.body));
        }
    }));

    roomController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        if(roomService.loadRoomById(req.params.id) !== null)
        {
            res.status(201).json(roomService.deleteRoom(req.params.id));
        }
    }));

    return roomController;
}