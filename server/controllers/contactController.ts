import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ContactService } from "../services/contactService";

export default function (passport)
{
    const contactController = Router();

    contactController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const contactService = new ContactService();
        res.status(200).json(contactService.loadAll());
    }));

    contactController.post('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const contactService = new ContactService();
        res.status(201).json(contactService.updateContact(req.body));
    }));

    contactController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const contactService = new ContactService();
        const contactInformation = contactService.loadContactById(req.params.id);
        if(contactInformation !== null)
        {
            res.status(200).json(contactInformation);
        } else {
            res.status(400).json({ error: 'Invalid Contact' })
        }
    }));

    contactController.put('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const contactService = new ContactService();
        if(contactService.loadContactById(req.params.id) !== null)
        {
            res.status(201).json(contactService.updateContact(req.body));
        } else {
            res.status(400).json({ error: 'Invalid Contact' })
        }
    }));

    contactController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const contactService = new ContactService();
        if(contactService.loadContactById(req.params.id) !== null)
        {
            res.status(201).json(contactService.deleteContact(req.params.id));
        } else {
            res.status(400).json({ error: 'Invalid Contact' })
        }
    }));

    return contactController;
}