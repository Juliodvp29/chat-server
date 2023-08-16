import express from 'express';
import { registerUser, loginUser, updateUser, deleteUser } from '../controllers/authController';
import { authenticateToken } from '../utils/auth';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.put('/update', authenticateToken, updateUser);
authRouter.delete('/delete', authenticateToken, deleteUser);




export default authRouter;
