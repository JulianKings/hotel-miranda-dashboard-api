import express, { Router } from 'express';
import { create_room, delete_room, room_all, room_by_id, update_room } from '../controllers/roomController';

export default function(passport) {
	var router: Router = express.Router();

    router.get('/', room_all);
    router.post('/', create_room);
    router.get('/:id', room_by_id);
    router.put('/:id', update_room);
    router.delete('/:id', delete_room);

    return router;
}
