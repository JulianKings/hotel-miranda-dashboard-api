import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiRoomInterface } from '../interfaces/room';
import mysql from 'mysql2/promise'

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
            return roomResult[0];
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