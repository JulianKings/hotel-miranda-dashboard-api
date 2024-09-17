import { ApiAbstractInterface } from "./apiManagement";

export interface ApiRoomInterface extends ApiAbstractInterface {
    type: 'Single Bed' | 'Double Bed' | 'Double Superior' | 'Suite',
    floor: string,
    number: number,        
    amenities: string,
    images: string,
    price: number,
    offer: number,
    status: 'available' | 'maintenance' | 'booked',
    description: string
}