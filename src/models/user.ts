import mysql from 'mysql';
import db from '../utils/db';

export const createUser = (db: mysql.Connection, username: string, user_handle: string, email: string, password: string) => {
  const query = 'INSERT INTO users (username, user_handle, email, password) VALUES (?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [username, user_handle, email, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const getUserByUsername = (db: mysql.Connection, username: string) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  return new Promise<any>((resolve, reject) => {
    db.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};


export const updateUserDetails = (userId: number, username: string, user_handle: string, email: string) => {
    const query = 'UPDATE users SET username = ?, user_handle = ?, email = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [username, email, user_handle, userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  

  export const deleteUserById = (userId: number) => {
    const query = 'DELETE FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  

  export const getAllUsersFromDB = () => {
    const query = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
      db.query(query, (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });
  };
  

  export const getUserByIdFromDB = (userId: number) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [userId], (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users[0]); // Devuelve el primer resultado si existe
        }
      });
    });
  };
  

  export const getUserByUserHandleFromDB = (user_handle: string) => {
    return new Promise<any>((resolve, reject) => {
      const query = `
        SELECT * FROM users
        WHERE user_handle = ?;
      `;
      db.query(query, [user_handle], (err, result) => {
        if (err) {
          console.error('Error al obtener usuario por user_handle:', err);
          reject(err);
        } else {
          const user = result[0];
          resolve(user);
        }
      });
    });
  };
  
  
  
  
  
  