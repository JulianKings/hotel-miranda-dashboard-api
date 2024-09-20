import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { BookingService } from "../services/bookingServices";
import { PassportStatic } from "passport";

export default function (passport: PassportStatic)
{
    const bookingController = Router();

    bookingController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        const allBookingsResult = await bookingService.loadAll();
        res.status(200).json(allBookingsResult);
    }));

    bookingController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        const bookingUpdate = await bookingService.updateBooking(req.body);
        res.status(201).json(bookingUpdate);
    }));

    bookingController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        const bookingInformation = await bookingService.loadBookingById(req.params.id);
        
        if(bookingInformation !== null)
        {
            res.status(200).json(bookingInformation);
        } else {
            res.status(400).json({ error: 'Invalid Booking' })
        }
    }));

    bookingController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        const bookingInformation = await bookingService.loadBookingById(req.params.id);
        
        if(bookingInformation !== null)
        {
            const updateResult = await bookingService.updateBooking(req.body);
            res.status(201).json(updateResult);
        } else {
            res.status(400).json({ error: 'Invalid Booking' })
        }
    }));

    bookingController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        const bookingInformation = await bookingService.loadBookingById(req.params.id);
        
        if(bookingInformation !== null)
        {
            const deleteResult = await bookingService.deleteBooking(req.params.id);
            res.status(201).json(deleteResult);
        } else {
            res.status(400).json({ error: 'Invalid Booking' })
        }
    }));

    return bookingController;
}