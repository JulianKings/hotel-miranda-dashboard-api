import { ApiContactInterface } from "../interfaces/apiManagement";

import path from 'path';
import { deleteFromJsonFile, readJsonFile, updateJsonFile } from "../util/jsonParser";

export class ContactService {
    loadAll(): ApiContactInterface[] {
        return readJsonFile(path.resolve(__dirname, "../data/contact.json"));
    }

    loadContactById(id: string): ApiContactInterface | null {
        const contacts = readJsonFile(path.resolve(__dirname, "../data/contact.json"));
        const contact = contacts.filter((contactElement) => contactElement.id === id);

        if(contact.length > 0)
        {
            return contact[0];
        } else {
            return null;
        }
    }

    updateContact(contactObject: ApiContactInterface)
    {
        updateJsonFile(path.resolve(__dirname, "../data/contact.json"), contactObject)
        return contactObject;
    }

    deleteContact(contactId: string)
    {
        deleteFromJsonFile(path.resolve(__dirname, "../data/contact.json"), { id: contactId })
        return { id: contactId };
    }
}