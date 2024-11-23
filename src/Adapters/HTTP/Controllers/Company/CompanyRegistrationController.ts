import { FastifyReply, FastifyRequest } from 'fastify'
import RegistrationUseCase, {
  CompanyInputDTO,
} from 'src/Application/UseCases/Company/RegistrationUseCase'
import { UserAlreadyExistsException } from 'src/Application/UseCases/Exceptions/UserAlreadyExistsException'
import { CompanyRepository } from 'src/Infrastructure/Repository/Prisma/CompanyRepository'
import { z } from 'zod'

export async function CompanyRegistrationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    ownerName: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    address: z
      .object({
        zipCode: z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .optional(),
  })

  const companyRegistrationUseCase = new RegistrationUseCase(
    new CompanyRepository(),
  )
  const body = bodySchema.parse(request.body)
  try {
    await companyRegistrationUseCase.execute(body as CompanyInputDTO)
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsException) {
      return reply.status(409).send({ message: 'Email already exists' })
    }
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
