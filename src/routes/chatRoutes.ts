import db from "../utils/db";

export async function saveMessageToDatabase(senderId, receiverId, encryptedMessage) {
    const query = `
      INSERT INTO messages (sender_id, receiver_id, message)
      VALUES (?, ?, ?);
    `;
  
    const values = [senderId, receiverId, encryptedMessage];
  
    try {
      const result: any = await db.query(query, values);
      const messageId = result.insertId;
  
      return {
        id: messageId,
        sender_id: senderId,
        receiver_id: receiverId,
        message: encryptedMessage,
      };
    } catch (error) {
      throw new Error('Error al guardar el mensaje en la BD');
    }
  }
  