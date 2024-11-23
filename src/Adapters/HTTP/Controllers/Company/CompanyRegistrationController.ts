import { FastifyReply, FastifyRequest } from 'fastify'
import RegistrationUseCase, {
  CompanyInputDTO,
} from 'src/Application/UseCases/Company/RegistrationUseCase'
import { UserAlreadyExistsException } from 'src/Application/UseCases/Exceptions/UserAlreadyExistsException'
import ICompanyRepository from 'src/Infrastructure/Repository/ICompanyRepository'
import { z } from 'zod'

export function CompanyRegistrationController(repository: ICompanyRepository) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z.object({
      name: z.string(),
      ownerName: z.string(),
      email: z.string().email(),
      whatsapp: z.string(),
      password: z.string(),
      address: z
        .object({
          zipCode: z.string(),
          state: z.string(),
          city: z.string(),
          neighborhood: z.string(),
          street: z.string(),
          latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
          }),
          longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
          }),
        })
        .optional(),
    })

    const companyRegistrationUseCase = new RegistrationUseCase(repository)
    const body = bodySchema.parse(request.body)
    try {
      await companyRegistrationUseCase.execute(body as CompanyInputDTO)
      reply.status(201).send()
    } catch (error) {
      if (error instanceof UserAlreadyExistsException) {
        reply.status(409).send({ message: 'Email already exists' })
      }
      reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
