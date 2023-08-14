import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import db from './utils/db'; // Importa la instancia de la conexión

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// No necesitas configurar la conexión aquí, ya está configurada en el módulo db.ts

app.use((req: any, res: any, next) => {
  req.db = db; // Agrega la conexión a la solicitud para que esté disponible en las rutas y controladores
  next();
});

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
