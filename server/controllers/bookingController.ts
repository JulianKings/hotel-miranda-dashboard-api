import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { BookingService } from "../services/bookingServices";

export default function (passport)
{
    const bookingController = Router();

    bookingController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        res.status(200).json(bookingService.loadAll());
    }));

    bookingController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        res.status(201).json(bookingService.updateBooking(req.body));
    }));

    bookingController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        res.status(200).json(bookingService.loadBookingById(req.params.id));
    }));

    bookingController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        if(bookingService.loadBookingById(req.params.id) !== null)
        {
            res.status(201).json(bookingService.updateBooking(req.body));
        }
    }));

    bookingController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const bookingService = new BookingService();
        if(bookingService.loadBookingById(req.params.id) !== null)
        {
            res.status(201).json(bookingService.deleteBooking(req.params.id));
        }
    }));

    return bookingController;
}