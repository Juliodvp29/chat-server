import crypto from 'crypto';

const ENCRYPTION_KEY = crypto.randomBytes(32); // Genera una clave segura

export function encryptMessage(message) {
  const iv = crypto.randomBytes(16); // Genera un vector de inicialización
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(message, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + encrypted;
}

function decryptMessage(encryptedMessage) {
  const iv = Buffer.from(encryptedMessage.slice(0, 32), 'hex');
  const encryptedText = encryptedMessage.slice(32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}
