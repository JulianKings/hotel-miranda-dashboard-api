import { ApiAbstractInterface } from "./apiManagement";
import { ApiClientInterface } from "./client";
import { ApiRoomInterface } from "./room";

export interface ApiBookingInterface extends ApiAbstractInterface {
    client_id: number;
    date: Date;
    status: 'checking_out' | 'checking_in' | 'in_progress',
    room: number | ApiRoomInterface;
    client?: ApiClientInterface;
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
    clientCreatedAt?: string;
    clientUpdatedAt?: string;
}