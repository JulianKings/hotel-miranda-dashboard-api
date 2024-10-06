import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { BookingService } from "../services/bookingServices";
import { PassportStatic } from "passport";
import mysql from 'mysql2/promise';
import { body, validationResult } from "express-validator";
import { isValidId } from "../util/dataValidation";

export default function (passport: PassportStatic)
{
    const bookingController = Router();

    bookingController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const allBookingsResult = await BookingService.loadAll();
        res.status(200).json(allBookingsResult);
    }));

    bookingController.post('/', [
        body("customer_name", "Booking customer name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("customer_dni", "Booking customer dni must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("date", "Booking date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("status", "Booking status must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("room", "Booking room must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("check_in", "Booking check in date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("check_out", "Booking check out date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("notes", "Booking notes must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),  
            
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                const bookingUpdate = await BookingService.updateBooking(req.body);
                res.status(201).json(bookingUpdate);
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

    bookingController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const bookingInformation = await BookingService.loadBookingById(req.params.id);
            
            if(bookingInformation !== null)
            {
                res.status(200).json(bookingInformation);
            } else {
                res.status(400).json({ error: 'Invalid Booking' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    bookingController.put('/:id', [
        body("customer_name", "Booking customer name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("customer_dni", "Booking customer dni must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("date", "Booking date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("status", "Booking status must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("room", "Booking room must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("check_in", "Booking check in date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("check_out", "Booking check out date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("notes", "Booking notes must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
            
        expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                if(isValidId(req.params.id))
                {
                    const bookingInformation = await BookingService.loadBookingById(req.params.id);
                    
                    if(bookingInformation !== null)
                    {
                        const updateResult = await BookingService.updateBooking(req.body);
                        res.status(201).json(updateResult);
                    } else {
                        res.status(400).json({ error: 'Invalid Booking' })
                    }
                } else {
                    res.status(400).json({ error: 'Invalid Id' })
                }
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

    bookingController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {    
            const bookingInformation = await BookingService.loadBookingById(req.params.id);
            
            if(bookingInformation !== null)
            {
                const deleteResult = await BookingService.deleteBooking(req.params.id);
                res.status(201).json(deleteResult);
            } else {
                res.status(400).json({ error: 'Invalid Booking' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    return bookingController;
}