import path from 'path';
import { deleteFromJsonFile, readJsonFile, updateJsonFile } from "../util/jsonParser";
import { ApiBookingInterface } from '../interfaces/bookings';
import bookingModel from '../models/bookings';

export class BookingService {
    async loadAll(): Promise<ApiBookingInterface[]> {
        const allBookings = await bookingModel.find().exec();
        return allBookings;
    }

    async loadBookingById(id: string): Promise<ApiBookingInterface | null> {
        const bookingById = await bookingModel.findById(id).exec();

        if(bookingById !== null)
        {
            return bookingById
        } else {
            return null;
        }
    }

    async updateBooking(bookingObject: ApiBookingInterface)
    {
        if(bookingObject._id === undefined)
        {
            const newBooking = new bookingModel(bookingObject);
            const bookingResult = await newBooking.save();
            return bookingResult;
        } else {
            const updatedBooking = await bookingModel.findByIdAndUpdate(bookingObject._id, bookingObject, {});
            return updatedBooking;
        }
    }

    async deleteBooking(bookingId: string)
    {
        const deleteBooking = await bookingModel.findByIdAndDelete(bookingId);
        return { _id: bookingId };
    }
}