import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  // pense que cada rota é uma entidade post /user -> 'criar um usuário'
  // post /authenticate não faz muito sentido -> 'criar um autenticar'
  // post /sessions é mais legível -> 'criar uma sessão'
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  /* AUTHENTICATED */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
