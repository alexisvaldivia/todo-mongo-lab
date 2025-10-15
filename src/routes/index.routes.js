import express from 'express';
import { indexController } from '../controllers/index.controller.js';
import userRouter from './user.routes.js';
import todoRouter from './todo.routes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/todos', todoRouter);

router.get('/', indexController.index);

export default router;
