import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BookingService } from "../services/bookingServices";

const booking_all = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookingService = new BookingService();
    res.status(200).json(bookingService.loadAll());
})

const booking_by_id = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const bookingService = new BookingService();
    res.status(200).json(bookingService.loadBookingById(req.params.id));
})

const create_booking = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookingService = new BookingService();
    res.status(201).json(bookingService.updateBooking(req.body));
})

const update_booking = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const bookingService = new BookingService();
    if(bookingService.loadBookingById(req.params.id) !== null)
    {
        res.status(201).json(bookingService.updateBooking(req.body));
    }
})

const delete_booking = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const bookingService = new BookingService();
    if(bookingService.loadBookingById(req.params.id) !== null)
    {
        res.status(201).json(bookingService.deleteBooking(req.params.id));
    }
})

export { booking_all, booking_by_id, create_booking, update_booking, delete_booking}