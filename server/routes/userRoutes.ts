import express, { Router } from 'express';
import { create_user, delete_user, sso_check, update_user, users_all, users_by_id } from '../controllers/userController';


export default function(passport) {
	var router: Router = express.Router();

	router.get('/', users_all);
	router.get('/sso', sso_check);
	router.post('/', create_user);
	router.get('/:id', users_by_id);
	router.put('/:id', update_user);
	router.delete('/:id', delete_user);

 	return router;
}
