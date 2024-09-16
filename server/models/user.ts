import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

const userModel = mongoose.model("user", userSchema);

export default userModel;