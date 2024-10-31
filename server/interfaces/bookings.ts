import { ApiAbstractInterface } from "./apiManagement";
import { ApiRoomInterface } from "./room";

export interface ApiBookingInterface extends ApiAbstractInterface {
    client_id: number;
    date: Date;
    status: 'checking_out' | 'checking_in' | 'in_progress',
    room: number | ApiRoomInterface;
    check_in: Date;
    check_out: Date;
    notes: string;
    roomId?: number;
    roomType?: string;
    roomFloor?: string;
    roomNumber?: number;
    roomImages?: string;
    roomPrice?: number;
    roomOffer?: number;
    roomStatus?: string;
    roomDescription?: string;
    clientId?: number;
    clientName?: string;
    clientMail?: string;
}