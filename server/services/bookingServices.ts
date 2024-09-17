import path from 'path';
import { deleteFromJsonFile, readJsonFile, updateJsonFile } from "../util/jsonParser";
import { ApiBookingInterface } from '../interfaces/bookings';

export class BookingService {
    loadAll(): ApiBookingInterface[] {
        return readJsonFile(path.resolve(__dirname, "../data/bookings.json"));
    }

    loadBookingById(id: string): ApiBookingInterface | null {
        const bookings = readJsonFile(path.resolve(__dirname, "../data/bookings.json"));
        const booking = bookings.filter((bookingElement) => bookingElement.id === id);

        if(booking.length > 0)
        {
            return booking[0];
        } else {
            return null;
        }
    }

    updateBooking(bookingObject: ApiBookingInterface)
    {
        updateJsonFile(path.resolve(__dirname, "../data/bookings.json"), bookingObject)
        return bookingObject;
    }

    deleteBooking(bookingId: string)
    {
        deleteFromJsonFile(path.resolve(__dirname, "../data/bookings.json"), { id: bookingId })
        return { id: bookingId };
    }
}