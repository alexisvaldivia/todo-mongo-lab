import app from './app.js';
import { connect } from './db/mongo.js';

app.listen(process.env.PORT, async () => {
	try {
		await connect();

		console.log(`Servidor corriendo en: http://localhost:${process.env.PORT}`);
	} catch (err) {
		throw new Error(err)
	}
});