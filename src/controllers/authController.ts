import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, deleteUserById, getUserByUsername, updateUserDetails } from '../models/user';
import { generateToken } from '../utils/bcryptUtils';
import db from '../utils/db';

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(db, username, email, hashedPassword);
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(db, username);
    if (!user) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = generateToken(user.id);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const updateUser = async (req: any, res: Response) => {
    const userId = req.user.userId; // Obtiene el ID del usuario autenticado
    const { username, email } = req.body;
  
    try {
      await updateUserDetails(userId, username, email);
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ message: 'Error al actualizar usuario' });
    }
  };
  
  export const deleteUser = async (req: any, res: Response) => {
    const userId = req.user.userId; // Obtiene el ID del usuario autenticado
  
    try {
      await deleteUserById(userId);
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ message: 'Error al eliminar usuario' });
    }
  };
  