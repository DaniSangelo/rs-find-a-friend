import { FastifyInstance } from 'fastify'
import { companyRoutes } from './Adapters/HTTP/Controllers/Company/Routes'
import { petRoutes } from './Adapters/HTTP/Controllers/Pet/Routes'
import { ZodError } from 'zod'
import 'dotenv/config'

export function createApp(
  app: FastifyInstance,
  dependencies: {
    companyRegistrationController: ReturnType<typeof companyRoutes>
    petRegistrationController: ReturnType<typeof petRoutes>
  },
) {
  app.register(companyRoutes(dependencies.companyRegistrationController), {
    prefix: 'company',
  })
  app.register(petRoutes(dependencies.petRegistrationController), {
    prefix: 'pet',
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
  return app
}
