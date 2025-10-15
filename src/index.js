import express from 'express';
import dotenv from 'dotenv';
import { connect } from './db/mongo.js';

import router from '../src/routes/index.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/', router);

app.listen(process.env.PORT, async () => {
	try {
		await connect();

		console.log(`Servidor corriendo en: http://localhost:${process.env.PORT}`);
	} catch (err) {
		throw new Error(err)
	}
});
