import express from 'express';
import { todoController } from '../controllers/todo.controller.js';

const todoRouter = express.Router();

todoRouter.post('/', todoController.createTask);

todoRouter.get('/users/:id/todos', todoController.getTasksByUser);

todoRouter.get('/users/:id/todos/:todoId', todoController.getTaskById);

todoRouter.put('/users/:id/task/:todoId', todoController.updateTask);

todoRouter.delete('/users/:id/todos/:todoId', todoController.deleteTask);

export default todoRouter;