import { FastifyReply, FastifyRequest } from 'fastify'
import PetRegistrationUseCase, {
  PetInputDTO,
} from 'src/Application/UseCases/Pet/PetRegistrationUseCase'
import ICompanyRepository from 'src/Infrastructure/Repository/ICompanyRepository'
import IPetRepository from 'src/Infrastructure/Repository/IPetRepository'
import { z } from 'zod'

export function PetRegistrationController(
  repository: IPetRepository,
  companyRepository: ICompanyRepository,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z.object({
      name: z.string(),
      about: z.string(),
      age: z.string(),
      size: z.string(),
      energyLevel: z.string(),
      environment: z.string(),
      companyId: z.string().uuid(),
    })

    const petRegistrationUseCase = new PetRegistrationUseCase(
      repository,
      companyRepository,
    )
    const body = bodySchema.parse(request.body)
    try {
      await petRegistrationUseCase.execute(body as unknown as PetInputDTO)
      reply.status(201).send()
    } catch (error) {
      reply
        .status(500)
        .send({ message: 'Internal server error' + error.message })
    }
  }
}
