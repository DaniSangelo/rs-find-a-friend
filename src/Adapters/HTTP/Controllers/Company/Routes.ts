import { FastifyInstance } from 'fastify'
import { CompanyRegistrationController } from './CompanyRegistrationController'

export async function companyRoutes(app: FastifyInstance) {
  app.post('/', CompanyRegistrationController)
}
