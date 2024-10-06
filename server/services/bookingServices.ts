import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiBookingInterface } from '../interfaces/bookings';
import { ApiRoomInterface } from '../interfaces/room';
import { runExecute, runFastQuery, runQuery } from '../database/databaseFunctions';

export class BookingService {

    static async loadAll(): Promise<ApiBookingInterface[]> {
        const result = await runFastQuery("SELECT bookings.*,rooms.id as roomId,rooms.type as roomType,rooms.floor as roomFloor,rooms.number as roomNumber,rooms.images as roomImages,rooms.price as roomPrice,rooms.offer as roomOffer,rooms.status as roomStatus,rooms.description as roomDescription FROM bookings INNER JOIN rooms ON bookings.room_id = rooms.id GROUP BY bookings.id");
        return this.formatContactArray(result as ApiBookingInterface[]);
    }

    static async loadBookingById(id: string): Promise<ApiBookingInterface | null> {
        const result = await runQuery("SELECT bookings.*,rooms.id as roomId,rooms.type as roomType,rooms.floor as roomFloor,rooms.number as roomNumber,rooms.images as roomImages,rooms.price as roomPrice,rooms.offer as roomOffer,rooms.status as roomStatus,rooms.description as roomDescription FROM bookings INNER JOIN rooms ON bookings.room_id = rooms.id WHERE bookings.id = ? GROUP BY bookings.id", [id]);
        const bookingResult = this.formatContactArray(result as ApiBookingInterface[]);

        if(bookingResult.length > 0)
        {
            return bookingResult[0];
        } else {
            return null;
        }
    }

    static async updateBooking(bookingObject: ApiBookingInterface)
    {
        if(bookingObject._id === undefined)
        {
            const result = await runExecute("INSERT INTO bookings (customer_name, customer_dni, date, status, room_id, check_in, check_out, notes)" +
		        "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
		        [bookingObject.customer_name, '12345678D', bookingObject.date, bookingObject.status, bookingObject.room, bookingObject.check_in, bookingObject.check_out, bookingObject.notes])

            const formatedResult = result as QueryResultSchema;
            const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
            const bookingResult = { 
                ...bookingObject,
                id: newId,
                _id: newId+"",
                date: new Date(Date.parse((typeof(bookingObject.date) === 'string') ? bookingObject.date : bookingObject.date.toDateString())),
                check_in: new Date(Date.parse((typeof(bookingObject.check_in) === 'string') ? bookingObject.check_in : bookingObject.check_in.toDateString())),
                check_out: new Date(Date.parse((typeof(bookingObject.check_out) === 'string') ? bookingObject.check_out : bookingObject.check_out.toDateString()))
            }
            return bookingResult;
        } else {
            await runQuery("UPDATE bookings SET ? WHERE id = ?",
                [{
                    customer_name: bookingObject.customer_name, 
                    customer_dni: '12345678D', 
                    date: bookingObject.date, 
                    status: bookingObject.status, 
                    room: bookingObject.room, 
                    check_in: bookingObject.check_in, 
                    check_out: bookingObject.check_out,
                    notes: bookingObject.notes
                },  bookingObject._id])
            return bookingObject;
        }
    }

    static async deleteBooking(id: string)
    {
        await runQuery("DELETE FROM bookings WHERE id = ?", [id]);
        return { _id: id };
    }

    static formatContactArray(array: ApiBookingInterface[]):  ApiBookingInterface[]
    {
        return array.map((booking: ApiBookingInterface) => {
            return {
                ...booking,
                _id: booking.id+"",
                date: new Date(Date.parse((typeof(booking.date) === 'string') ? booking.date : booking.date.toDateString())),
                check_in: new Date(Date.parse((typeof(booking.check_in) === 'string') ? booking.check_in : booking.check_in.toDateString())),
                check_out: new Date(Date.parse((typeof(booking.check_out) === 'string') ? booking.check_out : booking.check_out.toDateString())),
                room: {
                    _id: booking.roomId,
                    id: booking.roomId,
                    type: booking.roomType,
                    floor: booking.roomFloor,
                    number: booking.roomNumber,
                    images: booking.roomImages,
                    price: booking.roomPrice,
                    offer: booking.roomOffer,
                    status: booking.roomStatus,
                    description: booking.roomDescription
                } as ApiRoomInterface
            }
        })
    }
}