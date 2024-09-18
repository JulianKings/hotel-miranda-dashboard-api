import mongoose from 'mongoose';
import { ApiUserInterface } from '../interfaces/user';

const Schema = mongoose.Schema;

const userSchema = new Schema<ApiUserInterface>({
    name: { type: String, required: true },
    full_name: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String, required: true },
    profile_picture: { type: String, required: true },
    start: { type: Date, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, required: true },
    position: { type: String, required: true }
  });

const userModel = mongoose.model<ApiUserInterface>("user", userSchema);

export default userModel;