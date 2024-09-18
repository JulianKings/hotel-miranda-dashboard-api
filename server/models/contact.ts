import mongoose from 'mongoose';
import { ApiContactInterface } from '../interfaces/contact';

const Schema = mongoose.Schema;

const contactSchema = new Schema<ApiContactInterface>({
	customer_name: { type: String, required: true },
	customer_mail: { type: String, required: true },
	customer_phone: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    subject: { type: String, required: true },
    comment: { type: String, required: true }
});

const contactModel = mongoose.model<ApiContactInterface>("contact", contactSchema);

export default contactModel;