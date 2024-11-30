import fastify from 'fastify'
import { createApp } from './app'
import { startServer } from './server'
import { CompanyRepository } from './Infrastructure/Repository/Prisma/CompanyRepository'
import { CompanyRegistrationController } from './Adapters/HTTP/Controllers/Company/CompanyRegistrationController'
import { PetRepository } from './Infrastructure/Repository/Prisma/PetRepository'
import { PetRegistrationController } from './Adapters/HTTP/Controllers/Pet/PetRegistrationController'

async function main() {
  const app = fastify()
  const companyRepository = new CompanyRepository()
  const petRepository = new PetRepository()
  const companyRegistrationController =
    CompanyRegistrationController(companyRepository)
  const petRegistrationController = PetRegistrationController(
    petRepository,
    companyRepository,
  )
  createApp(app, {
    companyRegistrationController,
    petRegistrationController,
  })
  await startServer(app)
}

main()
