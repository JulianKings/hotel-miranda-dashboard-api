import express, { Router } from 'express';
import { booking_all, booking_by_id, create_booking, delete_booking, update_booking } from '../controllers/bookingController';

export default function(passport) {
	var router: Router = express.Router();

    router.get('/', booking_all);
    router.post('/', create_booking);
    router.get('/:id', booking_by_id);
    router.put('/:id', update_booking);
    router.delete('/:id', delete_booking);

    return router;
}
