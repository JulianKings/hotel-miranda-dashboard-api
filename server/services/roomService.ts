import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiRoomInterface } from '../interfaces/room';
import mysql from 'mysql2/promise'
import { QueryAmenitiesInterface } from 'interfaces/amenities';

export class RoomService {
    connection: mysql.Connection;

    constructor(connection: mysql.Connection)
    {
        this.connection = connection;
    }

    async loadAll(): Promise<ApiRoomInterface[]> {
        const [result] = await this.connection.query("SELECT * FROM rooms");
        return this.formatRoomArray(result as ApiRoomInterface[]);
    }

    async loadRoomById(id: string): Promise<ApiRoomInterface | null> {
        const [result] = await this.connection.query("SELECT * FROM rooms WHERE id = ?", [id]);
        const roomResult = this.formatRoomArray(result as ApiRoomInterface[]);

        if(roomResult.length > 0)
        {
            const [jointResult] = await this.connection.query("SELECT rooms.id,GROUP_CONCAT(rooms_amenities.amenity_id) AS amenities_list FROM rooms INNER JOIN rooms_amenities ON rooms.id = rooms_amenities.room_id  GROUP BY rooms_amenities.room_id HAVING id LIKE ?", [id]);
            const amenitiesResult = jointResult as QueryAmenitiesInterface[];
            const preparedResult = roomResult[0];
            if(amenitiesResult.length > 0)
            {
                const jointAmenities = amenitiesResult[0];
                preparedResult.amenities = jointAmenities.amenities_list.split(',');
            } else {
                preparedResult.amenities = [];
            }
            return preparedResult;
        } else {
            return null;
        }
    }

    async updateRoom(roomObject: ApiRoomInterface)
    {
        if(roomObject._id === undefined)
        {
            const [result] = await this.connection.execute("INSERT INTO rooms (type, floor, number, images, price, offer, status, description)" +
		        "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
		    [roomObject.type, roomObject.floor, roomObject.number, roomObject.images, roomObject.price, roomObject.offer, roomObject.status, roomObject.description])

            const formatedResult = result as QueryResultSchema;
            const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
            const roomResult = { 
                ...roomObject,
                id: newId,
                _id: newId+""
            }
            return roomResult;
        } else {
            await this.connection.query("UPDATE rooms SET ? WHERE id = ?",
                [{
                    type: roomObject.type, 
                    floor: roomObject.floor, 
                    number: roomObject.number, 
                    images: roomObject.images, 
                    price: roomObject.price, 
                    offer: roomObject.offer, 
                    status: roomObject.status, 
                    description: roomObject.description
                },  roomObject._id])
            return roomObject;
        }
    }

    async deleteRoom(id: string)
    {
        await this.connection.query("DELETE FROM bookings WHERE room_id = ?", [id]);
        await this.connection.query("DELETE FROM rooms WHERE id = ?", [id]);
        return { _id: id };
    }

    formatRoomArray(array: ApiRoomInterface[]):  ApiRoomInterface[]
    {
        return array.map((room: ApiRoomInterface) => {
            return {
                ...room,
                _id: room.id+""
            }
        })
    }
}