import fastify from 'fastify'
import { companyRoutes } from './Adapters/HTTP/Controllers/Company/Routes'
import { ZodError } from 'zod'
import 'dotenv/config'

export const app = fastify()
app.register(companyRoutes, {
  prefix: '/company',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // todo: implement log
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
