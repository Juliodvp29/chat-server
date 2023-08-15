import { ApiResponse } from "../interfaces/response";
import { getAllUsersFromDB, getUserByIdFromDB } from "../models/user";

export const getAllUsers = async (req: any, res: any) => {
    try {
      const users = await getAllUsersFromDB();
      const response: ApiResponse = {
        success: true,
        message: 'Usuarios obtenidos exitosamente',
        data: users
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: `Error al obtener los usuarios : ${error}`,
      };
      res.status(500).json(response);
    }
  };
  

  export const getUserById = async (req: any, res: any) => {
    const userId = req.params.id;
  
    try {
      const user = await getUserByIdFromDB(userId);
      if (user) {
        const response: ApiResponse = {
          success: true,
          message: 'Usuario obtenido exitosamente',
          data: user
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: `Error al obtener usuario por ID : ${error}`,
      };
      res.status(500).json(response);
    }
  };
  