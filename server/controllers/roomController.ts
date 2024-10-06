import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { RoomService } from "../services/roomService";
import { PassportStatic } from "passport";
import { body, validationResult } from "express-validator";
import { isValidId } from "../util/dataValidation";

export default function (passport: PassportStatic)
{
    const roomController = Router();

    roomController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const allRoomsResult = await RoomService.loadAll();
        res.status(200).json(allRoomsResult);
    }));

    roomController.post('/', [
        body("type", "Room type must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("floor", "Room floor must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("number", "Room number must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("images", "Room images must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("price", "Room price must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("offer", "Room offer must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("status", "Room status must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("description", "Room description must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),  
            
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                const roomUpdate = await RoomService.updateRoom(req.body);
                res.status(201).json(roomUpdate);
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

    roomController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const roomInformation = await RoomService.loadRoomById(req.params.id);
            if(roomInformation !== null)
            {
                res.status(200).json(roomInformation);
            } else {
                res.status(400).json({ error: 'Invalid Room' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    roomController.put('/:id', [
        body("type", "Room type must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("floor", "Room floor must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("number", "Room number must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("images", "Room images must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("price", "Room price must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("offer", "Room offer must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("status", "Room status must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("description", "Room description must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        
        expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                if(isValidId(req.params.id))
                {
                    const roomInformation = await RoomService.loadRoomById(req.params.id);
                    
                    if(roomInformation !== null)
                    {
                        const updateResult = await RoomService.updateRoom(req.body);
                        res.status(201).json(updateResult);
                    } else {
                        res.status(400).json({ error: 'Invalid Room' })
                    }
                } else {
                    res.status(400).json({ error: 'Invalid Id' })
                }
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

    roomController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const roomInformation = await RoomService.loadRoomById(req.params.id);
            
            if(roomInformation !== null)
            {
                const deleteResult = await RoomService.deleteRoom(req.params.id);
                res.status(201).json(deleteResult);
            } else {
                res.status(400).json({ error: 'Invalid Room' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    return roomController;
}