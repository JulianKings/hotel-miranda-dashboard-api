import express from 'express';
import { create_user, delete_user, update_user, users_all, users_by_id } from '../controllers/userController';
var router = express.Router();

router.get('/', users_all);
router.post('/', create_user);
router.get('/:id', users_by_id);
router.put('/:id', update_user);
router.delete('/:id', delete_user);

export default router;
