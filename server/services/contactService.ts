import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiContactInterface } from '../interfaces/contact';
import { runExecute, runFastQuery, runQuery } from '../database/databaseFunctions';
import { getDateString } from '../util/dateHelper';

export class ContactService {

    static async loadAll(): Promise<ApiContactInterface[]> {
        const result = await runFastQuery("SELECT * FROM contacts");
        return this.formatContactArray(result as ApiContactInterface[]);
    }

    static async loadContactById(id: string): Promise<ApiContactInterface | null> {
        const result = await runQuery("SELECT * FROM contacts WHERE id = ?", [id]);
        const contactResult = this.formatContactArray(result as ApiContactInterface[]);

        if(contactResult.length > 0)
        {
            return contactResult[0];
        } else {
            return null;
        }
    }

    static async updateContact(contactObject: ApiContactInterface)
    {
        if(contactObject._id === undefined)
        {
            const result = await runExecute("INSERT INTO contacts (customer_name, customer_mail, customer_phone, date, status, subject, comment)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?);",
                [contactObject.customer_name, contactObject.customer_mail, contactObject.customer_phone, getDateString(contactObject.date), contactObject.status, contactObject.subject, contactObject.comment])
            
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
            await runQuery("UPDATE contacts SET ? WHERE id = ?",
                [{
                    customer_name: contactObject.customer_name, 
                    customer_mail: contactObject.customer_mail, 
                    customer_phone: contactObject.customer_phone, 
                    date: getDateString(contactObject.date), 
                    status: contactObject.status, 
                    subject: contactObject.subject, 
                    comment: contactObject.comment
                },  contactObject._id])
            return contactObject;
        }
    }

    static async deleteContact(id: string)
    {
        await runQuery("DELETE FROM contacts WHERE id = ?", [id]);
        return { _id: id };
    }

    static formatContactArray(array: ApiContactInterface[]):  ApiContactInterface[]
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