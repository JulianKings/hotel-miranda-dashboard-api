import path from 'path';
import { deleteFromJsonFile, readJsonFile, updateJsonFile } from "../util/jsonParser";
import { ApiRoomInterface } from '../interfaces/room';
import roomModel from '../models/room';

export class RoomService {
    async loadAll(): Promise<ApiRoomInterface[]> {
        const allRooms = await roomModel.find().exec();
        return allRooms;
    }

    async loadRoomById(id: string): Promise<ApiRoomInterface | null> {
        const roomById = await roomModel.findById(id).exec();

        if(roomById !== null)
        {
            return roomById
        } else {
            return null;
        }
    }

    async updateRoom(roomObject: ApiRoomInterface)
    {
        if(roomObject._id === undefined)
        {
            const newRoom = new roomModel(roomObject);
            const roomResult = await newRoom.save();
            return roomResult;
        } else {
            const updatedRoom = await roomModel.findByIdAndUpdate(roomObject._id, roomObject, {});
            return updatedRoom;
        }
    }

    async deleteRoom(roomId: string)
    {
        const deleteRoom = await roomModel.findByIdAndDelete(roomId);
        return { _id: roomId };
    }
}