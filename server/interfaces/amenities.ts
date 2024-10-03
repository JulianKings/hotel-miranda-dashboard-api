import { ApiAbstractInterface } from "./apiManagement";

export interface ApiAmenitiesInterface extends ApiAbstractInterface {
    name: string;
}

export interface QueryAmenitiesInterface {
    id: number;
    amenities_list: string;
}