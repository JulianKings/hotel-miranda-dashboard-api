import { Types } from "mongoose";
import { ApiAbstractInterface } from "./apiManagement";

export interface ApiBookingInterface extends ApiAbstractInterface {
    customer_name: string,
    date: Date,
    status: 'checking_out' | 'checking_in' | 'in_progress',
    room: Types.ObjectId,
    check_in: Date,
    check_out: Date,
    notes: string    
}