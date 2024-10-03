import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { PassportStatic } from "passport";
import mysql from 'mysql2/promise';
import { AmenitiesService } from "../services/amenitiesServices";

export default function (connection: mysql.Connection, passport: PassportStatic)
{
    const amenityController = Router();

    amenityController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const amenityService = new AmenitiesService(connection);
        const allAmenitiesResult = await amenityService.loadAll();
        res.status(200).json(allAmenitiesResult);
    }));

    amenityController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const amenityService = new AmenitiesService(connection);
        const amenityUpdate = await amenityService.updateAmenity(req.body);
        res.status(201).json(amenityUpdate);
    }));

    amenityController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const amenityService = new AmenitiesService(connection);
        const amenityInformation = await amenityService.loadAmenityById(req.params.id);
        
        if(amenityInformation !== null)
        {
            res.status(200).json(amenityInformation);
        } else {
            res.status(400).json({ error: 'Invalid Amenity' })
        }
    }));

    amenityController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const amenityService = new AmenitiesService(connection);
        const amenityInformation = await amenityService.loadAmenityById(req.params.id);

        if(amenityInformation !== null)
        {
            const updateResult = await amenityService.updateAmenity(req.body);
            res.status(201).json(updateResult);
        } else {
            res.status(400).json({ error: 'Invalid Amenity' })
        }
    }));

    amenityController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const amenityService = new AmenitiesService(connection);
        const amenityInformation = await amenityService.loadAmenityById(req.params.id);

        if(amenityInformation !== null)
        {
            const deleteResult = await amenityService.deleteAmenity(req.params.id);
            res.status(201).json(deleteResult);
        } else {
            res.status(400).json({ error: 'Invalid Amenity' })
        }
    }));

    return amenityController;
}