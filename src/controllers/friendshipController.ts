import { ApiResponse } from "../interfaces/response";
import { createFriendship, deleteFriendship, listCommonFriendsForUsers, listFriendsForUser } from "../models/friendships";

export const addFriend = async (req: any, res: any) => {
    const user_id = req.body.user_id; // ID del usuario autenticado
    const friend_id = req.body.friend_id;
  
    try {
      await createFriendship(user_id, friend_id);
      const response: ApiResponse = {
        success: true,
        message: 'Amigo agregado exitosamente'
      };
      res.status(201).json(response);
    } catch (error) {
      console.error('Error al agregar amigo:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Error al agregar amigo'
      };
      res.status(500).json(response);
    }
  };

  export const listUserFriends = async (req: any, res: any) => {
    const userId = req.params.id; // ID del usuario para el cual deseamos obtener la lista de amigos
  
    try {
      const friends = await listFriendsForUser(userId);
      
      const response: ApiResponse = {
        success: true,
        message: 'Lista de amigos obtenida exitosamente',
        data: {
          friends
        }
      };
      res.status(200).json(response);
    } catch (error) {
      console.error('Error al obtener la lista de amigos:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Error al obtener la lista de amigos'
      };
      res.status(500).json(response);
    }
  };

  export const deleteFriend = async (req: any, res: any) => {
    const userId = req.user.id; // ID del usuario autenticado
    const friendId = req.params.id; // ID del amigo a eliminar
  
    try {
      await deleteFriendship(userId, friendId);
      
      const response: ApiResponse = {
        success: true,
        message: 'Amigo eliminado exitosamente'
      };
      res.status(200).json(response);
    } catch (error) {
      console.error('Error al eliminar amigo:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Error al eliminar amigo'
      };
      res.status(500).json(response);
    }
  };


  export const listCommonFriends = async (req: any, res: any) => {
    const userId = req.params.id; // ID del usuario autenticado
    const friendId = req.params.friend_id; // ID del amigo para el cual deseamos encontrar amigos en común
  
    try {
      const commonFriends = await listCommonFriendsForUsers(userId, friendId);
      
      const response: ApiResponse = {
        success: true,
        message: 'Lista de amigos en común obtenida exitosamente',
        data: {
          commonFriends
        }
      };
      res.status(200).json(response);
    } catch (error) {
      console.error('Error al obtener la lista de amigos en común:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Error al obtener la lista de amigos en común'
      };
      res.status(500).json(response);
    }
  };