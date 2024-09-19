import { ApiContactInterface } from '../interfaces/contact';
import contactModel from '../models/contact';

export class ContactService {
    async loadAll(): Promise<ApiContactInterface[]> {
        const allContacts = await contactModel.find().exec();
        return allContacts;
    }

    async loadContactById(id: string): Promise<ApiContactInterface | null> {
        const contactById = await contactModel.findById(id).exec();

        if(contactById !== null)
        {
            return contactById
        } else {
            return null;
        }
    }

    async updateContact(contactObject: ApiContactInterface)
    {
        if(contactObject._id === undefined)
        {
            const newContact = new contactModel(contactObject);
            const contactResult = await newContact.save();
            return contactResult;
        } else {
            const updatedContact = await contactModel.findByIdAndUpdate(contactObject._id, contactObject, {});
            return updatedContact;
        }
    }

    async deleteContact(contactId: string)
    {
        const deleteContact = await contactModel.findByIdAndDelete(contactId);
        return { _id: contactId };
    }
}