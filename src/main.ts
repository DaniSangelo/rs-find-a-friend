import fastify from 'fastify'
import { createApp } from './app'
import { startServer } from './server'
import { CompanyRepository } from './Infrastructure/Repository/Prisma/CompanyRepository'
import { CompanyRegistrationController } from './Adapters/HTTP/Controllers/Company/CompanyRegistrationController'

async function main() {
  const app = fastify()
  const companyRepository = new CompanyRepository()
  const companyRegistrationController =
    CompanyRegistrationController(companyRepository)

  createApp(app, {
    companyRegistrationController,
  })
  await startServer(app)
}

main()
