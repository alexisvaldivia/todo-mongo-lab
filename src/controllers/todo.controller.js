import { ObjectId } from 'mongodb';
import { getDb } from '../db/mongo.js';

const getTasksByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const db = getDb();
        const tasks = await db.collection('todos').find({ usuarioId: userId }).toArray();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener las tareas', error: err.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const userId = req.params.id;
        const todoId = req.params.todoId;
        const db = getDb();
        const task = await db.collection('todos').findOne({
            usuarioId: userId,
            _id: new ObjectId(todoId),
        });
        task
            ? res.json(task)
            : res.status(404).json({ msg: 'Tarea no encontrada' });
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener la tarea', error: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const db = getDb();
        const userId = req.params.id;
        const result = await db.collection('todos').insertOne({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            estado: req.body.estado || 'Sin Iniciar',
            usuarioId: userId,
        });
        if (result.insertedId) {
            await db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $push: { todoList: result.insertedId } }
            );
         res.status(201).json({ msg: 'Tarea creada', taskId: result.insertedId });
        } else {
            res.status(500).json({ msg: 'Error al crear la tarea' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Error al crear la tarea', error: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const userId = req.params.id;
        const todoId = req.params.todoId;
        const db = getDb();
        const updateData = req.body;
        const result = await db.collection('todos').updateOne(
            { usuarioId: userId, _id: new ObjectId(todoId) },
            { $set: updateData }
        );
        if (result.matchedCount > 0) {
            res.json({ msg: 'Tarea actualizada exitosamente' });
        } else {
            res.status(404).json({ msg: 'Tarea no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Error al actualizar la tarea', error: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const userId = req.params.id;
        const todoId = req.params.todoId;
        const db = getDb();
        const result = await db.collection('todos').deleteOne({
            usuarioId: userId,
            _id: new ObjectId(todoId),
        });
        if (result.deletedCount > 0) {
            await db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $pull: { todoList: new ObjectId(todoId) } }
            );
            res.json({ msg: 'Tarea eliminada exitosamente' });
        } else {
            res.status(404).json({ msg: 'Tarea no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Error al eliminar la tarea', error: err.message });
    }
};

export const todoController = {
    getTasksByUser,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};