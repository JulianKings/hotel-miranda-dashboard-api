import { ApiAbstractInterface } from "./apiManagement";

export interface ApiUserInterface extends ApiAbstractInterface {
    name: string,
    full_name: string,
    password?: string,
    mail: string,
    profile_picture: string,
    start: Date | string,
    description: string,
    contact: string,
    status: string,
    position: string
}