import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { PassportStatic } from "passport";
import { AmenitiesService } from "../services/amenitiesServices";
import { isValidId } from "../util/dataValidation";
import { body, validationResult } from "express-validator";

export default function (passport: PassportStatic)
{
    const amenityController = Router();

    amenityController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const allAmenitiesResult = await AmenitiesService.loadAll();
        res.status(200).json(allAmenitiesResult);
    }));

    amenityController.post('/', [
        body("name", "Amenity name must not be empty")
            .trim()
            .isLength({ min: 1 })
            .escape(),
            
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                const amenityUpdate = await AmenitiesService.updateAmenity(req.body);
                res.status(201).json(amenityUpdate);
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

    amenityController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const amenityInformation = await AmenitiesService.loadAmenityById(req.params.id);
            
            if(amenityInformation !== null)
            {
                res.status(200).json(amenityInformation);
            } else {
                res.status(400).json({ error: 'Invalid Amenity' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    amenityController.put('/:id', [
        body("name", "Amenity name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
            
        expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                if(isValidId(req.params.id))
                {
                    const amenityInformation = await AmenitiesService.loadAmenityById(req.params.id);

                    if(amenityInformation !== null)
                    {
                        const updateResult = await AmenitiesService.updateAmenity(req.body);
                        res.status(201).json(updateResult);
                    } else {
                        res.status(400).json({ error: 'Invalid Amenity' })
                    }
                } else {
                    res.status(400).json({ error: 'Invalid Id' })
                }
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

    amenityController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const amenityInformation = await AmenitiesService.loadAmenityById(req.params.id);

            if(amenityInformation !== null)
            {
                const deleteResult = await AmenitiesService.deleteAmenity(req.params.id);
                res.status(201).json(deleteResult);
            } else {
                res.status(400).json({ error: 'Invalid Amenity' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    return amenityController;
}