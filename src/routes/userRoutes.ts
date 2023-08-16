import express from "express";
import { findUserByUserHandle, getAllUsers, getUserById } from "../controllers/userController";
import { addFriend, deleteFriend, listCommonFriends, listUserFriends } from "../controllers/friendshipController";
import { authenticateToken } from "../utils/auth";

const userRouter = express.Router();

userRouter.get('/all', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.get('/find/:user_handle', authenticateToken, findUserByUserHandle);
userRouter.post('/add-friend', authenticateToken, addFriend); 
userRouter.get('/:id/friends', authenticateToken, listUserFriends); 
userRouter.delete('/:id/delete-friend', authenticateToken, deleteFriend);
userRouter.get('/:id/common-friends/:friend_id', authenticateToken, listCommonFriends);

export default userRouter;