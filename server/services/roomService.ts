import { ApiRoomInterface } from "../interfaces/apiManagement";

import path from 'path';
import { deleteFromJsonFile, readJsonFile, updateJsonFile } from "../util/jsonParser";

export class RoomService {
    loadAll(): ApiRoomInterface[] {
        return readJsonFile(path.resolve(__dirname, "../data/room.json"));
    }

    loadRoomById(id: string): ApiRoomInterface | null {
        const rooms = readJsonFile(path.resolve(__dirname, "../data/room.json"));
        const room = rooms.filter((roomElement) => roomElement.id === id);

        if(room.length > 0)
        {
            return room[0];
        } else {
            return null;
        }
    }

    updateRoom(roomObject: ApiRoomInterface)
    {
        updateJsonFile(path.resolve(__dirname, "../data/room.json"), roomObject)
        return roomObject;
    }

    deleteRoom(roomId: string)
    {
        deleteFromJsonFile(path.resolve(__dirname, "../data/room.json"), { id: roomId })
        return { id: roomId };
    }
}