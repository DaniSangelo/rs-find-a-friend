import { FastifyInstance } from 'fastify'

export function petRoutes(controller: ReturnType<any>) {
  return async (app: FastifyInstance) => {
    app.post('/', controller)
  }
}
