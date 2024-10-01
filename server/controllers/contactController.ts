import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ContactService } from "../services/contactService";
import { PassportStatic } from "passport";
import mysql from 'mysql2/promise';

export default function (connection: mysql.Connection, passport: PassportStatic)
{
    const contactController = Router();

    contactController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const contactService = new ContactService(connection);
        const allContactsResult = await contactService.loadAll();
        res.status(200).json(allContactsResult);
    }));

    contactController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const contactService = new ContactService(connection);
        const contactUpdate = await contactService.updateContact(req.body);
        res.status(201).json(contactUpdate);
    }));

    contactController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const contactService = new ContactService(connection);
        const contactInformation = await contactService.loadContactById(req.params.id);
        
        if(contactInformation !== null)
        {
            res.status(200).json(contactInformation);
        } else {
            res.status(400).json({ error: 'Invalid Contact' })
        }
    }));

    contactController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const contactService = new ContactService(connection);
        const contactInformation = await contactService.loadContactById(req.params.id);

        if(contactInformation !== null)
        {
            const updateResult = await contactService.updateContact(req.body);
            res.status(201).json(updateResult);
        } else {
            res.status(400).json({ error: 'Invalid Contact' })
        }
    }));

    contactController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const contactService = new ContactService(connection);
        const contactInformation = await contactService.loadContactById(req.params.id);

        if(contactInformation !== null)
        {
            const deleteResult = await contactService.deleteContact(req.params.id);
            res.status(201).json(deleteResult);
        } else {
            res.status(400).json({ error: 'Invalid Contact' })
        }
    }));

    return contactController;
}