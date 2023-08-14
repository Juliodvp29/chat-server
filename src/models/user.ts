import mysql from 'mysql';
import db from '../utils/db';

export const createUser = (db: mysql.Connection, username: string, email: string, password: string) => {
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [username, email, password], (err, result) => {
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


export const updateUserDetails = (userId: number, username: string, email: string) => {
    const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [username, email, userId], (err, result) => {
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
  