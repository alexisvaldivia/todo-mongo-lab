import { ObjectId } from 'mongodb';
import { getDb } from '../db/mongo.js';

const getUsers = async (req, res) => {
	try {
		let db = getDb();
		let results = await db.collection('users').find().toArray();
		res.json(results);
	} catch (err) {
		res.send(`400, ${err}`);
	}
};

const createUser = async (req, res) => {
	try {
		let db = getDb();
		await db.collection('users').insertOne({
			nombre: req.query.nombre || 'Alexis',
			apellido: req.query.apellido || 'Valdivia',
			email: req.query.email || 'xyz@gmail.com',
			password: req.query.password || '1234',
			todoList: [],
		});
		res.send('Usuario creado.');
	} catch (err) {
		console.error(err);
	}
};

const getUser = async (req, res) => {
	let id = req.params.id;
	try {
		if (!ObjectId.isValid(id)) {
			return res.status(400).json({ error: 'Id invalido' });
		}
		id = new ObjectId(id);

		let db = getDb();
		let user = await db.collection('users').findOne({ _id: id });
		res.json(user);
	} catch (err) {
		res.send(`${err}, 400`);
	}
};

const deleteUser = async (req, res) => {
	let id = req.params.id;
	try {
		if (!ObjectId.isValid(id)) {
			return res.status(400).json({ error: 'Id invalido' });
		}
		let db = await getDb();
		console.log(db);
		let users = db.collection('users');
		id = new ObjectId(id);
		const result = await users.deleteOne({ _id: id });
		result.deletedCount === 0
			? res.status(404).json({ msg: 'Documento no encontrado.' })
			: res.status(200).json({ msg: `Se elimino el documento ${id}` });
	} catch (err) {
		res.status(400).json({ msg: 'Error al borrar el documento' });
		console.log(err);
	}
};

const updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const updateData = req.body;
		const db = getDb();
		console.log(`el id es: ${id} y la data es: ${updateData}`);
		const result = await db
			.collection('users')
			.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
		if (result.matchedCount > 0) {
			res.json({ msg: 'Documento actualizado exitosamente' });
		} else {
			res.status(404).json({ msg: 'Documento no encontrado' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: 'Error al actualizar el documento' });
	}
};

export const userController = {
	getUsers,
	createUser,
	getUser,
	deleteUser,
	updateUser,
};
