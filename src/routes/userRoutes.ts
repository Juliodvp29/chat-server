import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/all', getAllUsers);
userRouter.get('/:id', getUserById);

export default userRouter;