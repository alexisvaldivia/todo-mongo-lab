import express from 'express';
import { userController } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/user/:id', userController.getUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);

export default userRouter;