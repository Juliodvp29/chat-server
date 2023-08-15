import { getAllUsersFromDB, getUserByIdFromDB } from "../models/user";

export const getAllUsers = async (req: any, res: any) => {
    try {
      const users = await getAllUsersFromDB();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  };
  

  export const getUserById = async (req: any, res: any) => {
    const userId = req.params.id;
  
    try {
      const user = await getUserByIdFromDB(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      res.status(500).json({ message: 'Error al obtener usuario por ID' });
    }
  };
  