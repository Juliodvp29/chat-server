# Proyecto Chat application 

Este es un proyecto de una aplicación de chat en la web desarrollada con Node.js, TypeScript, MySQL y Express.

## Características

- Registro y autenticación de usuarios.
- Envío y recepción de mensajes.
- Actualización y eliminación de usuarios.
- ...

## Configuración

1. Clona este repositorio.
2. Instala las dependencias usando `npm install`.
3. Crea una base de datos MySQL llamada `chat_db`.
4. Ejecuta el script SQL en `db/chat.sql` para crear las tablas.
5. Crea un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias (ejemplo abajo).
6. Inicia el servidor usando `npm start`.

## Variables de Entorno

Crea un archivo `.env` y define las siguientes variables de entorno:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mipassword
DB_NAME=chat_db
JWT_SECRET=miClaveSecreta


## Contribuciones

Si quieres contribuir a este proyecto, ¡siéntete libre de hacerlo! Abre un issue o una pull request para sugerir mejoras o correcciones.




