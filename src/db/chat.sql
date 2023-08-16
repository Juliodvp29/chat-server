DROP DATABASE IF EXISTS chat_db;
CREATE DATABASE chat_db;

USE chat_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  user_handle VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  friends_count int not null default 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE friendships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  friend_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (friend_id) REFERENCES users(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

DELIMITER //
CREATE TRIGGER update_friends_count
AFTER INSERT ON friendships
FOR EACH ROW
BEGIN
  -- Actualizar el conteo de amigos para el usuario que agregó un amigo
  UPDATE users
  SET friends_count = friends_count + 1
  WHERE id = NEW.user_id;

  -- Actualizar el conteo de amigos para el usuario que se agregó como amigo
  UPDATE users
  SET friends_count = friends_count + 1
  WHERE id = NEW.friend_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_friends_count_after_insert
AFTER INSERT ON friendships
FOR EACH ROW
BEGIN
  -- Incrementar el contador de amigos para ambos usuarios
  UPDATE users
  SET friends_count = friends_count + 1
  WHERE id = NEW.user_id OR id = NEW.friend_id;
END;
//

CREATE TRIGGER update_friends_count_after_delete
AFTER DELETE ON friendships
FOR EACH ROW
BEGIN
  -- Decrementar el contador de amigos para ambos usuarios
  UPDATE users
  SET friends_count = friends_count - 1
  WHERE id = OLD.user_id OR id = OLD.friend_id;
END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE ListUserFriends(IN userId INT)
BEGIN
  SELECT users.id, users.username, users.user_handle, users.email
  FROM friendships
  INNER JOIN users ON (friendships.friend_id = users.id)
  WHERE friendships.user_id = userId;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ListCommonFriends(IN user1Id INT, IN user2Id INT)
BEGIN
  SELECT users.id, users.username, users.user_handle, users.email
  FROM friendships
  INNER JOIN users ON (friendships.friend_id = users.id)
  WHERE friendships.user_id = user1Id IN (
    SELECT friend_id
    FROM friendships
    WHERE user_id = user2Id
  )
  LIMIT 10;
END;
//
DELIMITER ;




