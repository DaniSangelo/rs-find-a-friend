import RegistrationUseCase from 'src/Application/UseCases/Company/RegistrationUseCase'
import CompanyRegistrationInMemoryRepository from 'src/Infrastructure/Repository/InMemory/CompanyRegistrationInMemoryRepository'
import { beforeEach, describe, expect, it } from 'vitest'

let companyRegistrationRepository: CompanyRegistrationInMemoryRepository
let companyRegistrationUseCase: RegistrationUseCase

beforeEach(() => {
  companyRegistrationRepository = new CompanyRegistrationInMemoryRepository()
  companyRegistrationUseCase = new RegistrationUseCase(
    companyRegistrationRepository,
  )
})

describe('Company registration use case', () => {
  it('Should can register a new company', async () => {
    const company = await companyRegistrationUseCase.execute({
      name: 'Mark I',
      ownerName: 'Mark I',
      email: 'mark.1@mail.com',
      whatsapp: '12345678910',
      password: '123456',
    })
    expect(company).toHaveProperty('id')
  })
})
