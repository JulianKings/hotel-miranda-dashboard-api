import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { PassportStatic } from "passport";
import { isValidId } from "../util/dataValidation";
import { ClientService } from "../services/clientService";

export default function (passport: PassportStatic)
{
    const clientController = Router();

    clientController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const allClientsResult = await ClientService.loadAll();
        res.status(200).json(allClientsResult);
    }));

    clientController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const clientInformation = await ClientService.loadClientById(req.params.id);
            
            if(clientInformation !== null)
            {
                res.status(200).json(clientInformation);
            } else {
                res.status(400).json({ error: 'Invalid Client' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    clientController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const clientInformation = await ClientService.loadClientById(req.params.id);

            if(clientInformation !== null)
            {
                const deleteResult = await ClientService.deleteClient(req.params.id);
                res.status(201).json(deleteResult);
            } else {
                res.status(400).json({ error: 'Invalid Client' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    return clientController;
}