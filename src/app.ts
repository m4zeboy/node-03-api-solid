import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify()

// SOLID
// D - Dependency Inversion Principle

app.register(appRoutes)
