import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiBookingInterface } from '../interfaces/bookings';
import { ApiRoomInterface } from '../interfaces/room';
import { runExecute, runFastQuery, runQuery } from '../database/databaseFunctions';

export class BookingService {

    static async loadAll(): Promise<ApiBookingInterface[]> {
        const result = await runFastQuery("SELECT bookings.*,clients.name AS clientName, clients.email AS clientMail,clients.id AS clientId,rooms.id as roomId,rooms.type as roomType,rooms.floor as roomFloor,rooms.number as roomNumber,rooms.images as roomImages,rooms.price as roomPrice,rooms.offer as roomOffer,rooms.status as roomStatus,rooms.description as roomDescription FROM bookings INNER JOIN rooms ON bookings.room_id = rooms.id INNER JOIN clients ON bookings.client_id = clients.id GROUP BY bookings.id");
        return this.formatBookingArray(result as ApiBookingInterface[]);
    }

    static async loadBookingById(id: string): Promise<ApiBookingInterface | null> {
        const result = await runQuery("SELECT bookings.*,clients.name AS clientName, clients.email AS clientMail,clients.id AS clientId,rooms.id as roomId,rooms.type as roomType,rooms.floor as roomFloor,rooms.number as roomNumber,rooms.images as roomImages,rooms.price as roomPrice,rooms.offer as roomOffer,rooms.status as roomStatus,rooms.description as roomDescription FROM bookings INNER JOIN rooms ON bookings.room_id = rooms.id INNER JOIN clients ON bookings.client_id = clients.id WHERE bookings.id = ? GROUP BY bookings.id", [id]);
        const bookingResult = this.formatBookingArray(result as ApiBookingInterface[]);

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
            const result = await runExecute("INSERT INTO bookings (client_id, date, status, room_id, check_in, check_out, notes)" +
		        "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
		        [bookingObject.client_id, bookingObject.date, bookingObject.status, bookingObject.room, bookingObject.check_in, bookingObject.check_out, bookingObject.notes])

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
                    client_id: bookingObject.client_id, 
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

    static formatBookingArray(array: ApiBookingInterface[]):  ApiBookingInterface[]
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
                } as ApiRoomInterface,
                client: {
                    id: booking.clientId,
                    name: booking.clientName,
                    mail: booking.clientMail
                }
            }
        })
    }
}