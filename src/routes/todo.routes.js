import express from 'express';
import { todoController } from '../controllers/todo.controller.js';

const todoRouter = express.Router();

todoRouter.post('/user/:id/todo', todoController.createTask);
todoRouter.get('/user/:id/todos', todoController.getTasksByUser);

export default todoRouter;
