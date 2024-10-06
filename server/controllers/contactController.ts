import { NextFunction, Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ContactService } from "../services/contactService";
import { PassportStatic } from "passport";
import { body, validationResult } from "express-validator";
import { isValidId } from "../util/dataValidation";

export default function (passport: PassportStatic)
{
    const contactController = Router();

    contactController.get('/', expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const allContactsResult = await ContactService.loadAll();
        res.status(200).json(allContactsResult);
    }));

    contactController.post('/', [
        body("customer_name", "Contact customer name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("customer_mail", "Contact customer mail must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),  
        body("customer_phone", "Contact customer phone must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("date", "Contact date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("status", "Contact status must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("subject", "Contact subject must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("comment", "Contact comment must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                const contactUpdate = await ContactService.updateContact(req.body);
                res.status(201).json(contactUpdate);
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

    contactController.get('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const contactInformation = await ContactService.loadContactById(req.params.id);
            
            if(contactInformation !== null)
            {
                res.status(200).json(contactInformation);
            } else {
                res.status(400).json({ error: 'Invalid Contact' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    contactController.put('/:id', [
        body("customer_name", "Contact customer name must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),
        body("customer_mail", "Contact customer mail must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(),  
        body("customer_phone", "Contact customer phone must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("date", "Contact date must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("status", "Contact status must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("subject", "Contact subject must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
        body("comment", "Contact comment must not be empty.")
            .trim()
            .isLength({ min: 1 })
            .escape(), 
            
        expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            
            if(errors.isEmpty())
            {
                if(isValidId(req.params.id))
                {
                    const contactInformation = await ContactService.loadContactById(req.params.id);

                    if(contactInformation !== null)
                    {
                        const updateResult = await ContactService.updateContact(req.body);
                        res.status(201).json(updateResult);
                    } else {
                        res.status(400).json({ error: 'Invalid Contact' })
                    }
                } else {
                    res.status(400).json({ error: 'Invalid Id' })
                }
            } else {
                res.status(400).json({ errors: errors});
            }
        })
    ]);

    contactController.delete('/:id', expressAsyncHandler(async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        if(isValidId(req.params.id))
        {
            const contactInformation = await ContactService.loadContactById(req.params.id);

            if(contactInformation !== null)
            {
                const deleteResult = await ContactService.deleteContact(req.params.id);
                res.status(201).json(deleteResult);
            } else {
                res.status(400).json({ error: 'Invalid Contact' })
            }
        } else {
            res.status(400).json({ error: 'Invalid Id' })
        }
    }));

    return contactController;
}