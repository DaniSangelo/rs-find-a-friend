import { FastifyInstance } from 'fastify'

export function companyRoutes(controller: ReturnType<any>) {
  return async (app: FastifyInstance) => {
    app.post('/', controller)
  }
}
