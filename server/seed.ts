import { faker } from '@faker-js/faker';
import bookingModel from './models/bookings';
import userModel from './models/user';
import contactModel from './models/contact';
import roomModel from './models/room';
import mongoose from 'mongoose';
import { ApiUserInterface } from './interfaces/user';
import { ApiContactInterface } from './interfaces/contact';
import 'dotenv/config';
import { ApiRoomInterface } from './interfaces/room';
import { ApiBookingInterface } from './interfaces/bookings';

function createRandomUser(): ApiUserInterface {
    return {
		_id: undefined,
		name: faker.internet.userName(),
		full_name: faker.person.fullName(),
		password: "$2a$10$3ZaCp.V0lvHyqyle9aKfmOX2APUb960o1oX0EWFNFtX4/lyMCRkcG", // test
		mail: faker.internet.email(),
		profile_picture: faker.image.avatar(),
		start: new Date(faker.date.recent()),
		description: faker.person.jobTitle(),
		contact: faker.phone.number({ style: 'international' }),
		status: faker.helpers.arrayElement(['active', 'inactive']),
		position: faker.helpers.arrayElement(['manager', 'room_service', 'reception'])
    };
}

function createRandomContact(): ApiContactInterface {
    return {
		_id: undefined,
		customer_name: faker.person.fullName(),
		customer_mail: faker.internet.email(),
		customer_phone: faker.phone.number({style: "international"}),
		date: new Date(faker.date.recent()),
		status: faker.helpers.arrayElement(['active', 'archived']),
		subject: faker.lorem.lines(1),
		comment: faker.lorem.paragraph({ min: 6, max: 10})
    };
}

function createRandomRoom(): ApiRoomInterface {
    return {
		_id: undefined,
		type: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
		floor: "Floor " + faker.helpers.arrayElement(['A', 'B', 'C']) + "-" + faker.number.int({min: 0, max: 10}),
		number: faker.number.int({min: 40, max: 100}),        
		amenities: [],
		images: faker.image.url(),
		price: faker.number.int({min: 40, max: 100}),
		offer: faker.number.int({min: 40, max: 100}),
		status: faker.helpers.arrayElement(['available', 'maintenance', 'booked']),
		description: faker.lorem.paragraph({ min: 3, max: 8})
    };
}

class BookingGenerator
{
	roomList: ApiRoomInterface[];

	constructor(rList: ApiRoomInterface[]) {
		this.roomList = rList;
	}

	createRandomBooking(): ApiBookingInterface {
		const roomItem = getRandomInt(rooms.length);
		return {
			_id: undefined,
			customer_name: faker.person.fullName(),
			date: new Date(faker.date.recent()),
			status: faker.helpers.arrayElement(['checking_out', 'checking_in', 'in_progress']),
			room: (rooms[roomItem]._id !== undefined) ? rooms[roomItem]._id : '',
			check_in: new Date(faker.date.past()),
			check_out: new Date(faker.date.future()),
			notes: faker.lorem.paragraph({ min: 3, max: 8})   
		};
	}
}
  
let users: ApiUserInterface[] = faker.helpers.multiple(createRandomUser, { count: 20, });
const contacts: ApiContactInterface[] = faker.helpers.multiple(createRandomContact, { count: 20, });
const rooms: ApiRoomInterface[] = faker.helpers.multiple(createRandomRoom, { count: 20, });
let bookings: ApiBookingInterface[] = [];


function concatenateDefaultUsers(): void
{
	const defaultDeveloper: ApiUserInterface = {
		"_id": undefined,
		"name": "Developer",
		"full_name": "Julian Reyes",
		"password": "$2a$10$/QfwEmoOALQrmk8RGIoMYOkmel5NTQJ8MmQJPjgGAM/MR5JRkpng2",
		"mail": "julianreyeslahoz@gmail.com",
		"profile_picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSwWsVwCB7k3J9sTCSX2C352hGm0cbuANvZw&s",
		"start": "2023-08-16T00:00:00.000Z",
		"description": "Legacy Functionality Producer",
		"contact": "311 093 5870",
		"status": "active",
		"position": "manager"
	}

	const defaultAdmin: ApiUserInterface = {
		"_id": undefined,
		"name": "admin",
		"full_name": "Juana Dietrich",
		"password": "$2a$10$A9NlYzY3NkTdx.m1KjK8PO5CfHxcGrz44MOWunlSQf9uinEj6VU9u",
		"mail": "Juana67@yahoo.com",
		"profile_picture": "./src/assets/profile2.png",
		"start": "2024-06-20T12:58:36.794Z",
		"description": "Dynamic Tactics Specialist",
		"contact": "685 231 8978",
		"status": "inactive",
		"position": "reception"
	}

	const defaultDuck: ApiUserInterface = {
		"_id": undefined,
		"name": "Patoman",
		"full_name": "Pato Duckensen",
		"password": "$2a$10$gpti1uGOyy0Lli6vMM.W4uRgg6Y6nn8qttzwQ0s8Z.DKUmPwUwyJC",
		"mail": "duck@duckerson.com",
		"profile_picture": "./src/assets/profile.png",
		"start": "2024-08-30T00:00:00.000Z",
		"description": "Duck Duckenson Dunken",
		"contact": "123456789",
		"status": "active",
		"position": "manager"
	}

	const defaultTest: ApiUserInterface = {
		_id: undefined,
		"name": "test",
		"full_name": "Julián Reyes",
		"password": "$2a$10$3ZaCp.V0lvHyqyle9aKfmOX2APUb960o1oX0EWFNFtX4/lyMCRkcG",
		"mail": "julli123@hotmail.es",
		"profile_picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSwWsVwCB7k3J9sTCSX2C352hGm0cbuANvZw&s",
		"start": "2024-08-30T00:00:00.000Z",
		"description": "testcito",
		"contact": "684135340",
		"status": "inactive",
		"position": "manager"
	}

	users = users.concat([ defaultDeveloper, defaultAdmin, defaultDuck, defaultTest]);
}

main().catch((err) => console.log(err));
  
async function main() {
	mongoose.set("strictQuery", false);

	const mongoUri: string = (process.env.MONGODB_URI !== undefined) ? process.env.MONGODB_URI : '';

	console.log("Debug: About to connect");
	await mongoose.connect(mongoUri);
	console.log("Debug: Should be connected?");

	concatenateDefaultUsers();
	await createUsers();
	await createContacts();
	await createRooms();
	const book = new BookingGenerator(rooms);
	bookings = faker.helpers.multiple(book.createRandomBooking, { count: 20, });
	await createBookings();

	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

async function createUser(user, index)
{
	const userMod = new userModel(user);
	await userMod.save();

	users[index] = userMod;
}

async function createUsers() {
	console.log('Adding users');
	const concatPromise: Promise<void>[] = [];
	users.forEach((user, index) => 
	{
		concatPromise.push(createUser(user, index))
	});

	await Promise.all(concatPromise);
}

async function createContact(contact, index)
{
	const contactMod = new contactModel(contact);
	await contactMod.save();

	contacts[index] = contactMod;
}

async function createContacts() {
	console.log('Adding contact');
	const concatPromise: Promise<void>[] = [];
	contacts.forEach((contact, index) => 
	{
		concatPromise.push(createContact(contact, index))
	});

	await Promise.all(concatPromise);
}

async function createRoom(room, index)
{
	const roomMod = new roomModel(room);
	await roomMod.save();

	rooms[index] = roomMod;
}

async function createRooms() {
	console.log('Adding rooms');
	const concatPromise: Promise<void>[] = [];
	rooms.forEach((room, index) => 
	{
		concatPromise.push(createRoom(room, index))
	});

	await Promise.all(concatPromise);
}

async function createBooking(booking, index)
{
	const bookingMod = new bookingModel(booking);
	await bookingMod.save();

	bookings[index] = bookingMod;
}

async function createBookings() {
	console.log('Adding bookings');
	const concatPromise: Promise<void>[] = [];
	bookings.forEach((booking, index) => 
	{
		concatPromise.push(createBooking(booking, index))
	});

	await Promise.all(concatPromise);
}

function getRandomInt(max: number): number
{
    return Math.floor(Math.random() * max);
}