import mongoose from 'mongoose';
import { ApiBookingInterface } from '../interfaces/bookings';

const Schema = mongoose.Schema;

const bookingSchema = new Schema<ApiBookingInterface>({
	customer_name: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: "room", required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    notes: { type: String, required: true }  
});

const bookingModel = mongoose.model<ApiBookingInterface>("booking", bookingSchema);

export default bookingModel;