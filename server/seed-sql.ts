import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise'
import { ApiUserInterface } from './interfaces/user';
import { ApiContactInterface } from './interfaces/contact';
import dotenv from "dotenv";
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
		price: faker.number.int({min: 1, max: 10000}),
		offer: faker.number.int({min: 10, max: 90}),
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
			room: + ((rooms[roomItem]._id !== undefined) ? rooms[roomItem]._id : ''),
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

interface QueryResultSchema {   
	fieldCount?: number,   
	affectedRows?: number,   
	insertId?: number,   
	info?: string,   
	serverStatus?: number,   
	warningStatus?: number,   
	changedRows?: number, 
}


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
	dotenv.config();
	
	const connection = await mysql.createConnection({
		host: (process.env.SQL_HOST !== undefined) ? process.env.SQL_HOST : 'localhost',
		user: (process.env.SQL_USER !== undefined) ? process.env.SQL_USER : 'admin',
		port: ((process.env.SQL_PORT !== undefined) ? +process.env.SQL_PORT : 3306),
		database: (process.env.SQL_DATABASE !== undefined) ? process.env.SQL_DATABASE : 'miranda',
		password: (process.env.SQL_PASSWORD !== undefined) ? process.env.SQL_PASSWORD : ''
	});
	console.log("Debug: Should be connected?");

	try {
		await runCleanup(connection);
		concatenateDefaultUsers();
		await createUsers(connection);
		//await createContacts(connection);
		//await createRooms(connection);
		//const book = new BookingGenerator(rooms);
		//bookings = faker.helpers.multiple(book.createRandomBooking, { count: 20, });
		//await createBookings(connection);

		console.log("Debug: Closing mysql");
		connection.end();
	} catch (error) {
		console.error(error);
	}
}

async function runCleanup(connection: mysql.Connection) {
	console.log('Cleaning up old data...');

	/*await connection.execute(
		'DROP TABLE IF EXISTS room_amenities'
	);
	
	await connection.execute(
		'DROP TABLE IF EXISTS amenities'
	);

	await connection.execute(
		'DROP TABLE IF EXISTS bookings'
	);
	
	await connection.execute(
		'DROP TABLE IF EXISTS rooms'
	);*/

	await connection.execute(
		'DROP TABLE IF EXISTS users'
	);

	/*await connection.execute(
		'DROP TABLE IF EXISTS contacts'
	);*/

}

async function createUser(user: ApiUserInterface, index: number, connection: mysql.Connection)
{
	const [result] = await connection.execute("INSERT INTO users (name, full_name, password, mail, profile_picture, start, description, contact, status, position)" +
		"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
		 [user.name, user.full_name, user.password, user.mail, user.profile_picture, user.start, 
			user.description, user.contact, user.status, user.position])

	const formatedResult = result as QueryResultSchema;
	const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
	const userObj = { ...user,
		_id: newId+""
	}

	users[index] = userObj;
}

async function createUsers(connection: mysql.Connection) {
	console.log('Adding users');
	await connection.query("CREATE TABLE users (" +
		"id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
		"name VARCHAR(50) NOT NULL," +
		"full_name VARCHAR(100) NOT NULL," +
		"password VARCHAR(255) NOT NULL," +
		"mail VARCHAR(100) NOT NULL," +
		"profile_picture VARCHAR(255) NOT NULL," +
		"start VARCHAR(100) NOT NULL," +
		"description VARCHAR(5000) NOT NULL," +
		"contact VARCHAR(100) NOT NULL," +
		"status ENUM ('active', 'inactive') NOT NULL," +
		"position ENUM ('manager', 'room_service', 'reception') NOT NULL" +
		");"
	)

	const concatPromise: Promise<void>[] = [];
	users.forEach((user, index) => 
	{
		concatPromise.push(createUser(user, index, connection))
	});

	await Promise.all(concatPromise);
}

async function createContact(contact: ApiContactInterface, index: number, connection: mysql.Connection)
{
	const [result] = await connection.execute("INSERT INTO contacts (customer_name, customer_mail, customer_phone, date, status, subject, comment)" +
		"VALUES (?, ?, ?, ?, ?, ?, ?);",
		 [contact.customer_name, contact.customer_mail, contact.customer_phone, contact.date, contact.status, contact.subject, contact.comment])

	const formatedResult = result as QueryResultSchema;
	const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
	const contactObj = { ...contact,
		_id: newId+""
	}

	contacts[index] = contactObj;
}

async function createContacts(connection: mysql.Connection) {
	console.log('Adding contact');
	await connection.query("CREATE TABLE contacts (" +
		"id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
		"customer_name VARCHAR(100) NOT NULL," +
		"customer_mail VARCHAR(100) NOT NULL," +
		"customer_phone VARCHAR(30) NOT NULL," +
		"date VARCHAR(100) NOT NULL," +
		"status ENUM ('active', 'archived') NOT NULL," +
		"subject VARCHAR(500) NOT NULL," +
		"comment VARCHAR(5000) NOT NULL" +
		");"
	)

	const concatPromise: Promise<void>[] = [];
	contacts.forEach((contact, index) => 
	{
		concatPromise.push(createContact(contact, index, connection))
	});

	await Promise.all(concatPromise);
}

async function createRoom(room: ApiRoomInterface, index: number, connection: mysql.Connection)
{
	const [result] = await connection.execute("INSERT INTO rooms (type, floor, number, images, price, offer, status, description)" +
		"VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
		 [room.type, room.floor, room.number, room.images, room.price, room.offer, room.status, room.description])

	const formatedResult = result as QueryResultSchema;
	const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
	const roomObj = { ...room,
		_id: newId+""
	}

	rooms[index] = roomObj;
}

async function createRooms(connection: mysql.Connection) {
	console.log('Adding rooms');
	await connection.query("CREATE TABLE rooms (" +
		"id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
		"type ENUM ('Single Bed', 'Double Bed', 'Double Superior', 'Suite') NOT NULL," +
		"floor VARCHAR(40) NOT NULL," +
		"number INT NOT NULL," +
		"images VARCHAR(255) NOT NULL," +
		"price INT NOT NULL," +
		"offer INT NOT NULL," +
		"status ENUM ('booked', 'maintenance', 'available') NOT NULL," +
		"description VARCHAR(5000) NOT NULL" +
		");"
	)

	await createAmenities(connection);
	await createRoomAmenities(connection)

	const concatPromise: Promise<void>[] = [];
	rooms.forEach((room, index) => 
	{
		concatPromise.push(createRoom(room, index, connection))
	});

	await Promise.all(concatPromise);
}

async function createAmenities(connection: mysql.Connection)
{
	console.log('Adding amenities');
	await connection.query("CREATE TABLE amenities (" +
		"id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
		"name VARCHAR(100) NOT NULL" +
		");"
	)

	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Air conditioner']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Breakfast']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Cleaning']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Grocery']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Shop near']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['24/7 Online Support']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Smart Security']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['High speed WiFi']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Kitchen']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Shower']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Single bed']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Towels']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Strong locker']);
	await connection.execute("INSERT INTO amenities (name) VALUES (?)", ['Expert Team']);
}

async function createRoomAmenities(connection: mysql.Connection)
{
	console.log('Adding room_amenities');
	await connection.query("CREATE TABLE room_amenities (" +
		"id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
		"room_id INT NOT NULL," +
		"amenity_id INT NOT NULL," +
		"FOREIGN KEY(room_id) REFERENCES rooms(id) ON DELETE CASCADE," +
		"FOREIGN KEY(amenity_id) REFERENCES amenities(id) ON DELETE CASCADE" +
		");"
	)
}

async function createBooking(booking: ApiBookingInterface, index: number, connection: mysql.Connection)
{
	const [result] = await connection.execute("INSERT INTO bookings (customer_name, customer_dni, date, status, room_id, check_in, check_out, notes)" +
		"VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
		 [booking.customer_name, '12345678D', booking.date, booking.status, booking.room, booking.check_in, booking.check_out, booking.notes])

	const formatedResult = result as QueryResultSchema;
	const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
	const bookingObj = { ...booking,
		_id: newId+""
	}

	bookings[index] = bookingObj;
}

async function createBookings(connection: mysql.Connection) {
	console.log('Adding bookings');
	await connection.query("CREATE TABLE bookings (" +
		"id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
		"customer_name VARCHAR(100) NOT NULL," +
		"customer_dni VARCHAR(100) NOT NULL," +
		"date VARCHAR(100) NOT NULL," +
		"status ENUM ('checking_out', 'checking_in', 'in_progress') NOT NULL," +
		"room_id INT NOT NULL," +
		"check_in VARCHAR(100) NOT NULL," +
		"check_out VARCHAR(100) NOT NULL," +
		"notes VARCHAR(5000) NOT NULL," +
		"FOREIGN KEY(room_id) REFERENCES rooms(id) ON DELETE CASCADE" +
		");"
	);

	const concatPromise: Promise<void>[] = [];
	bookings.forEach((booking, index) => 
	{
		concatPromise.push(createBooking(booking, index, connection))
	});

	await Promise.all(concatPromise);
}

function getRandomInt(max: number): number
{
    return Math.floor(Math.random() * max);
}