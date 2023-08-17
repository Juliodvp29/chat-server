import request from 'supertest';
import { app } from '../src/server';


describe('CHAT API', () => {
    it('should show all users', async () => {
      const response = await request(app)
        .get('/users/all')
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Usuarios obtenidos exitosamente');
    });
  
    it('should log in user', async () => {
        const response = await request(app)
          .post('/auth/login')
          .send({
            username: 'Mariana Gonzalez',
            password: '$MarianaPass123',
          });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Usuario logueado exitosamente!');
      });

  });