import express, { Router } from 'express';
import { contact_by_id, contacts_all, create_contact, delete_contact, update_contact } from '../controllers/contactController';

export default function(passport) {
	var router: Router = express.Router();

    router.get('/', contacts_all);
    router.post('/', create_contact);
    router.get('/:id', contact_by_id);
    router.put('/:id', update_contact);
    router.delete('/:id', delete_contact);

    return router;
}
