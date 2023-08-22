import 'dotenv/config'
import { z } from 'zod'

/* 
  [ ] definir o formato (schema) das variáveis
  [ ] tentar converter as váriáveis para o formato criado
  [ ] se der erro, derrubar a aplicação para ela não possa funcionar sem as varáveis de ambiente
  [ ] se não, exportar as váriáveis de ambiente. 
*/

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables.', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
