import mongoose from 'mongoose';
import { ApiRoomInterface } from '../interfaces/room';

const Schema = mongoose.Schema;

const roomSchema = new Schema<ApiRoomInterface>({
    type: { type: String, required: true },
    floor: { type: String, required: true },
    number: { type: Number, required: true },        
    amenities: { type: [String], required: true },
    images: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: Number, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true }
  });

const roomModel = mongoose.model<ApiRoomInterface>("room", roomSchema);

export default roomModel;