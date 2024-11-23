import RegistrationUseCase from 'src/Application/UseCases/Company/RegistrationUseCase'
import { UserAlreadyExistsException } from 'src/Application/UseCases/Exceptions/UserAlreadyExistsException'
import { CompanyAddressDTO } from 'src/Domain/Entities/Company'
import InMemoryCompanyRepository from 'src/Infrastructure/Repository/InMemory/InMemoryCompanyRepository'
import { beforeEach, describe, expect, it } from 'vitest'

let companyRepository: InMemoryCompanyRepository
let companyRegistrationUseCase: RegistrationUseCase
let address: CompanyAddressDTO

beforeEach(() => {
  companyRepository = new InMemoryCompanyRepository()
  companyRegistrationUseCase = new RegistrationUseCase(companyRepository)
  address = {
    zipCode: '30514030',
    state: 'Minas Gerais',
    city: 'Belo Horizonte',
    neighborhood: 'Betânia',
    street: 'Rua das Flores',
    latitude: -40.7128,
    longitude: -74.006,
  }
})

describe('Company registration use case', () => {
  it('Should be able to register a new company', async () => {
    const company = await companyRegistrationUseCase.execute({
      name: 'Mark I',
      ownerName: 'Mark I',
      email: 'mark.1@mail.com',
      whatsapp: '12345678910',
      password: '123456',
      address,
    })
    expect(company).toHaveProperty('id')
  })

  it('Should be able to find a company by email', async () => {
    const company = await companyRegistrationUseCase.execute({
      name: 'Mark I',
      ownerName: 'Mark I',
      email: 'mark.1@mail.com',
      whatsapp: '12345678910',
      password: '123456',
      address,
    })
    const foundCompany = await companyRepository.findByEmail('mark.1@mail.com')
    expect(company.getEmail()).toEqual(foundCompany?.getEmail())
    expect(foundCompany).toHaveProperty('id')
  })

  it('Should not be able to register two companies with the same email address', async () => {
    await companyRegistrationUseCase.execute({
      name: 'Mark I',
      ownerName: 'Mark I',
      email: 'mark.1@mail.com',
      whatsapp: '12345678910',
      password: '123456',
      address,
    })
    await expect(() =>
      companyRegistrationUseCase.execute({
        name: 'Mark I',
        ownerName: 'Mark I',
        email: 'mark.1@mail.com',
        whatsapp: '12345678910',
        password: '123456',
        address,
      }),
    ).rejects.toThrowError(new UserAlreadyExistsException())
  })
})
