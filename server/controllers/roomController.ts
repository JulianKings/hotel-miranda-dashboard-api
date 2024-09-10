import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { RoomService } from "../services/roomService";

const room_all = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const roomService = new RoomService();
    res.status(200).json(roomService.loadAll());
})

const room_by_id = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const roomService = new RoomService();
    res.status(200).json(roomService.loadRoomById(req.params.id));
})

const create_room = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const roomService = new RoomService();
    res.status(201).json(roomService.updateRoom(req.body));
})

const update_room = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const roomService = new RoomService();
    if(roomService.loadRoomById(req.params.id) !== null)
    {
        res.status(201).json(roomService.updateRoom(req.body));
    }
})

const delete_room = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const roomService = new RoomService();
    if(roomService.loadRoomById(req.params.id) !== null)
    {
        res.status(201).json(roomService.deleteRoom(req.params.id));
    }
})

export { room_all, room_by_id, create_room, update_room, delete_room }