import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, deleteUserById, getUserByUsername, updateUserDetails } from '../models/user';
import { generateToken } from '../utils/bcryptUtils';
import db from '../utils/db';
import { ApiResponse } from '../interfaces/response';

export const registerUser = async (req: Request, res: Response) => {
  const { username, user_handle, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(db, username, user_handle, email, hashedPassword);
    const response: ApiResponse = {
      success: true,
      message: 'Usuario registrado exitosamente',
    };
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: `Error al registrar usuario: ${error}`,
    };
    res.status(500).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;


  try {
    const user = await getUserByUsername(db, username);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'Usuario incorrecto' 
      };
      res.status(401).json(response);
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = generateToken(user.id);
      const response: ApiResponse = {
        success: true,
        message: 'Usuario logueado exitosamente!',
        data: {user, token}
      };
      res.status(200).json(response);
    } else {
      const response: ApiResponse = {
        success: false,
        message: 'Contraseña incorrecta',
      };
      res.status(401).json(response);
    }
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: `Error al iniciar sesión: ${error}`,
    };
    res.status(500).json(response);
  }
};

export const updateUser = async (req: any, res: Response) => {
    const userId = req.user.userId; // Obtiene el ID del usuario autenticado
    const { username, user_handle, email } = req.body;
  
    try {
      await updateUserDetails(userId, username, user_handle, email);
      const response: ApiResponse = {
        success: true,
        message: 'Usuario actualizado exitosamente'
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: `Error al actualizar usuario: ${error}` 
      };
      res.status(500).json(response);
    }
  };
  
  export const deleteUser = async (req: any, res: Response) => {
    const userId = req.user.userId; // Obtiene el ID del usuario autenticado
  
    try {
      await deleteUserById(userId);
      const response: ApiResponse = {
        success: true,
        message: 'Usuario eliminado exitosamente',
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: `Error al eliminar usuario: ${error}`,
      };
      res.status(500).json(response);
    }
  };
  