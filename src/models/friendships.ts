import db from "../utils/db";

export const createFriendship = (user_id: number, friend_id: number) => {
  return new Promise<void>((resolve, reject) => {
    const query = `
      INSERT INTO friendships (user_id, friend_id)
      VALUES (?, ?);
    `;
    db.query(query, [user_id, friend_id], (err, result) => {
      if (err) {
        console.error('Error al crear amistad:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const listFriendsForUser = (userId: number) => {
    return new Promise<any>((resolve, reject) => {
      const query = 'CALL ListUserFriends(?)';
      db.query(query, [userId], (err, result) => {
        if (err) {
          console.error('Error al obtener la lista de amigos:', err);
          reject(err);
        } else {
          const friends = result[0];
          resolve(friends);
        }
      });
    });
};

export const deleteFriendship = (user_id: number, friend_id: number) => {
    return new Promise<void>((resolve, reject) => {
      const query = `
        DELETE FROM friendships
        WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?);
      `;
      db.query(query, [user_id, friend_id, friend_id, user_id], (err, result) => {
        if (err) {
          console.error('Error al eliminar amistad:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
};

export const listCommonFriendsForUsers = (user1Id: number, user2Id: number) => {
    return new Promise<any>((resolve, reject) => {
      const query = 'CALL ListCommonFriends(?, ?)';
      db.query(query, [user1Id, user2Id], (err, result) => {
        if (err) {
          console.error('Error al obtener la lista de amigos en común:', err);
          reject(err);
        } else {
          const commonFriends = result[0];
          resolve(commonFriends);
        }
      });
    });
  };