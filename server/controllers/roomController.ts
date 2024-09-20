import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { RoomService } from "../services/roomService";
import { PassportStatic } from "passport";

export default function (passport: PassportStatic)
{
    const roomController = Router();

    roomController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        const allRoomsResult = await roomService.loadAll();
        res.status(200).json(allRoomsResult);
    }));

    roomController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        const roomUpdate = await roomService.updateRoom(req.body);
        res.status(201).json(roomUpdate);
    }));

    roomController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        const roomInformation = await roomService.loadRoomById(req.params.id);
        if(roomInformation !== null)
        {
            res.status(200).json(roomInformation);
        } else {
            res.status(400).json({ error: 'Invalid Room' })
        }
    }));

    roomController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        const roomInformation = await roomService.loadRoomById(req.params.id);
        
        if(roomInformation !== null)
        {
            const updateResult = await roomService.updateRoom(req.body);
            res.status(201).json(updateResult);
        } else {
            res.status(400).json({ error: 'Invalid Room' })
        }
    }));

    roomController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const roomService = new RoomService();
        const roomInformation = await roomService.loadRoomById(req.params.id);
        
        if(roomInformation !== null)
        {
            const deleteResult = await roomService.deleteRoom(req.params.id);
            res.status(201).json(deleteResult);
        } else {
            res.status(400).json({ error: 'Invalid Room' })
        }
    }));

    return roomController;
}