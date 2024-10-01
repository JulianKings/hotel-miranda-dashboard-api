import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiContactInterface } from '../interfaces/contact';
import mysql from 'mysql2/promise';

export class ContactService {
    connection: mysql.Connection;

    constructor(connection: mysql.Connection)
    {
        this.connection = connection;
    }

    async loadAll(): Promise<ApiContactInterface[]> {
        const [result] = await this.connection.query("SELECT * FROM contacts");
        return this.formatContactArray(result as ApiContactInterface[]);
    }

    async loadContactById(id: string): Promise<ApiContactInterface | null> {
        const [result] = await this.connection.query("SELECT * FROM contacts WHERE id = ?", [id]);
        const contactResult = this.formatContactArray(result as ApiContactInterface[]);

        if(contactResult.length > 0)
        {
            return contactResult[0];
        } else {
            return null;
        }
    }

    async updateContact(contactObject: ApiContactInterface)
    {
        if(contactObject._id === undefined)
        {
            const [result] = await this.connection.execute("INSERT INTO contacts (customer_name, customer_mail, customer_phone, date, status, subject, comment)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?);",
                [contactObject.customer_name, contactObject.customer_mail, contactObject.customer_phone, contactObject.date, contactObject.status, contactObject.subject, contactObject.comment])
            
            const formatedResult = result as QueryResultSchema;
            const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
            const contactResult = { 
                ...contactObject,
                id: newId,
                _id: newId+"",
                date: new Date(Date.parse((typeof(contactObject.date) === 'string') ? contactObject.date : contactObject.date.toDateString()))
            }
            return contactResult;
        } else {
            await this.connection.query("UPDATE contacts SET ? WHERE id = ?",
                [{
                    customer_name: contactObject.customer_name, 
                    customer_mail: contactObject.customer_mail, 
                    customer_phone: contactObject.customer_phone, 
                    date: contactObject.date, 
                    status: contactObject.status, 
                    subject: contactObject.subject, 
                    comment: contactObject.comment
                },  contactObject._id])
            return contactObject;
        }
    }

    async deleteContact(id: string)
    {
        const [result] = await this.connection.query("DELETE FROM contacts WHERE id = ?", [id]);
        return { _id: id };
    }

    formatContactArray(array: ApiContactInterface[]):  ApiContactInterface[]
    {
        return array.map((contact: ApiContactInterface) => {
            return {
                ...contact,
                _id: contact.id+"",
                date: new Date(Date.parse((typeof(contact.date) === 'string') ? contact.date : contact.date.toDateString()))
            }
        })
    }
}