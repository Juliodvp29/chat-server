# Chat API 

## Características

- Registro y autenticación de usuarios.
- Envío y recepción de mensajes.
- Actualización y eliminación de usuarios.
- Gestión de amigos y amigos en común.
- ...

## Configuración

1. Clona este repositorio.
2. Instala las dependencias usando `npm install`.
3. Crea una base de datos MySQL llamada `chat_db`.
4. Ejecuta el script SQL en `db/chat.sql` para crear las tablas, incluyendo las relaciones de amistad y los procedimientos almacenados.
5. Crea un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias (ejemplo abajo).
6. Inicia el servidor usando `npm start`.

## Rutas

A continuación se muestran las rutas disponibles en la API:

- `POST /auth/register`: Registro de un nuevo usuario.
- `POST /auth/login`: Inicio de sesión de usuario.
- `PUT /users/update`: Actualización de un usuario.
- `DELETE /users/delete`: Eliminación de usuario.
- `GET /users/all`: Obtención de la lista de todos los usuarios.
- `GET /users/:id`: Obtención de un usuario por ID.
- `GET /users/handle/:user_handle`: Obtención de un usuario por user_handle.
- `POST /users/add-friend`: Agregar un amigo a la lista de amigos.
- `GET /users/:id/common-friends/:friend_id`: Obtener amigos en común entre dos usuarios.
- `DELETE /users/delete-friend/:friend_id`: Eliminar un amigo de la lista de amigos.

## Variables de Entorno

Crea un archivo `.env` y define las siguientes variables de entorno:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mipassword
DB_NAME=chat_db
JWT_SECRET=miClaveSecreta



