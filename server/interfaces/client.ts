import { ApiAbstractInterface } from "./apiManagement";

export interface ApiClientInterface extends ApiAbstractInterface {
    name: string,
    email: string,
    created_at: Date | string,
    updated_at: Date | string,
}