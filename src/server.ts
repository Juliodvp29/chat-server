import express from 'express';
import bodyParser from 'body-parser';
import http from 'http'
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes';
import db from './utils/db'; // Importa la instancia de la conexión
import userRouter from './routes/userRoutes';
import { saveMessageToDatabase } from './routes/chatRoutes';
import { encryptMessage } from './utils/cryptoMessage';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;


// CORS
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000'], // Lista de dominios permitidos
  methods: 'GET,POST,PUT,DELETE' // Métodos HTTP permitidos
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.use((req: any, res: any, next) => {
  req.db = db; // Agrega la conexión a la solicitud para que esté disponible en las rutas y controladores
  next();
});

// Maneja el evento de envío de mensajes
io.on('connection', async (socket: any) => {
  try {

    // Encripta el mensaje antes de guardarlo en la BD
    const encryptedMessage = encryptMessage(socket.message);

    // Guarda el mensaje en la BD
    const savedMessage = await saveMessageToDatabase(
      socket.sender_id,
      socket.receiver_id,
      encryptedMessage
    );

    // Emite el mensaje al destinatario
    socket.to(`user:${socket.receiver_id}`).emit('new_message', savedMessage);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
});

// rutas principales
app.use('/auth', authRoutes);
app.use('/users', userRouter);

server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
