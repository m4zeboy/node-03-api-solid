import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  // pense que cada rota é uma entidade post /user -> 'criar um usuário'
  // post /authenticate não faz muito sentido -> 'criar um autenticar'
  // post /sessions é mais legível -> 'criar uma sessão'
  app.post('/sessions', authenticate)
  /* AUTHENTICATED */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
