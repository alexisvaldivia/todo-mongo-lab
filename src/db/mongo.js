import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.URI;
const client = new MongoClient(uri);
let db = null;

export const connect = async () => {
	try {
		await client.connect();
		db = client.db(process.env.DB_NAME);
		console.log('Conectado a la db');
	} catch (err) {
		console.error(err);
	}
};

export const getDb = () => {
	if (db) {
		return db;
	} else {
		connect();
	}
};