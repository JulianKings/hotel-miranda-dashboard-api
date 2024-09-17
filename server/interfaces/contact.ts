import { ApiAbstractInterface } from "./apiManagement";

export interface ApiContactInterface extends ApiAbstractInterface {
    customer_name: string,
    customer_mail: string,
    customer_phone: string,
    date: Date,
    status: 'archived' | 'active',
    subject: string,
    comment: string
}