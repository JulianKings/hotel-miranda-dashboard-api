import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ContactService } from "../services/contactService";

const contacts_all = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const contactService = new ContactService();
    res.status(200).json(contactService.loadAll());
})

const contact_by_id = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const contactService = new ContactService();
    res.status(200).json(contactService.loadContactById(req.params.id));
})

const create_contact = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const contactService = new ContactService();
    res.status(201).json(contactService.updateContact(req.body));
})

const update_contact = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const contactService = new ContactService();
    if(contactService.loadContactById(req.params.id) !== null)
    {
        res.status(201).json(contactService.updateContact(req.body));
    }
})

const delete_contact = expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const contactService = new ContactService();
    if(contactService.loadContactById(req.params.id) !== null)
    {
        res.status(201).json(contactService.deleteContact(req.params.id));
    }
})

export { contacts_all, contact_by_id, create_contact, update_contact, delete_contact }