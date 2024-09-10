import express from 'express';
import { create_room, delete_room, room_all, room_by_id, update_room } from '../controllers/roomController';
var router = express.Router();

router.get('/', room_all);
router.post('/', create_room);
router.get('/:id', room_by_id);
router.put('/:id', update_room);
router.delete('/:id', delete_room);

export default router;
