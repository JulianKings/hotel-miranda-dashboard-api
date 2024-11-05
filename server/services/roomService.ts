import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiRoomInterface } from '../interfaces/room';
import { QueryApiRoomInterface } from '../interfaces/database';
import { runFastQuery, runQuery } from '../database/databaseFunctions';

export class RoomService {

    static async loadAll(): Promise<ApiRoomInterface[]> {
        const result = await runFastQuery("SELECT rooms.*,GROUP_CONCAT(room_amenities.amenity_id) AS amenities_list FROM rooms LEFT JOIN room_amenities ON rooms.id = room_amenities.room_id GROUP BY rooms.id");
        return this.formatRoomArray(result as QueryApiRoomInterface[]);
    }

    static async loadRoomById(id: string): Promise<ApiRoomInterface | null> {
        const result = await runQuery("SELECT rooms.*,GROUP_CONCAT(room_amenities.amenity_id) AS amenities_list FROM rooms LEFT JOIN room_amenities ON rooms.id = room_amenities.room_id WHERE rooms.id = ? GROUP BY rooms.id", [id]);
        const roomResult = this.formatRoomArray(result as QueryApiRoomInterface[]);

        if(roomResult.length > 0)
        {
            return roomResult[0];
        } else {
            return null;
        }
    }

    static async updateRoom(roomObject: ApiRoomInterface)
    {
        if(roomObject._id === undefined)
        {
            const result = await runQuery("INSERT INTO rooms (type, floor, number, images, price, offer, status, description)" +
		        "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
		    [roomObject.type, roomObject.floor, roomObject.number, roomObject.images, roomObject.price, roomObject.offer, roomObject.status, roomObject.description])

            const formatedResult = result as QueryResultSchema;
            const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
            const roomResult = { 
                ...roomObject,
                id: newId,
                _id: newId+"",
                images: roomObject.images.replaceAll('&#x2F;', '/'),                
            }

            if(roomObject.amenities !== undefined)
            {
                for(const amenity of roomObject.amenities)
                {
                    await runQuery("INSERT INTO room_amenities (room_id, amenity_id) VALUES (?, ?)", [newId, amenity]);
                }
            }


            return roomResult;
        } else {
            await runQuery("UPDATE rooms SET ? WHERE id = ?",
                [{
                    type: roomObject.type, 
                    floor: roomObject.floor, 
                    number: roomObject.number, 
                    images: roomObject.images, 
                    price: roomObject.price, 
                    offer: roomObject.offer, 
                    status: roomObject.status, 
                    description: roomObject.description
                },  roomObject._id]);


            if(roomObject.amenities !== undefined)
            {
                await runQuery("DELETE FROM room_amenities WHERE room_id = ?", [roomObject._id]);
                for(const amenity of roomObject.amenities)
                {
                    await runQuery("INSERT INTO room_amenities (room_id, amenity_id) VALUES (?, ?)", [roomObject._id, amenity]);
                }
            }

            const roomResult = { 
                ...roomObject,
                id: roomObject._id,
                images: roomObject.images.replaceAll('&#x2F;', '/'),                
            }
            return roomResult;
        }
    }

    static async deleteRoom(id: string)
    {
        await runQuery("DELETE FROM rooms WHERE id = ?", [id]);
        return { _id: id };
    }

    static formatRoomArray(array: QueryApiRoomInterface[]):  ApiRoomInterface[]
    {
        return array.map((room: QueryApiRoomInterface) => {
            return {
                ...room,
                _id: room.id+"",
                images: room.images.replaceAll('&#x2F;', '/'),
                amenities: (room.amenities_list === null) ? [] : 
                    (room.amenities_list.includes(',') ? room.amenities_list.split(',') : [room.amenities_list])
            }
        })
    }
}