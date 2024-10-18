import RegistrationUseCase from 'src/Application/UseCases/Company/RegistrationUseCase'
import Address from 'src/Domain/ValueObjects/Address'
import Coordinates from 'src/Domain/ValueObjects/Coordinates'
import InMemoryCompanyRepository from 'src/Infrastructure/Repository/InMemory/InMemoryCompanyRepository'
import { beforeEach, describe, expect, it } from 'vitest'

let companyRepository: InMemoryCompanyRepository
let companyRegistrationUseCase: RegistrationUseCase

beforeEach(() => {
  companyRepository = new InMemoryCompanyRepository()
  companyRegistrationUseCase = new RegistrationUseCase(companyRepository)
})

describe('Company registration use case', () => {
  it('Should can register a new company', async () => {
    const address = new Address(
      '30514030',
      'Minas Gerais',
      'Belo Horizonte',
      'Betânia',
      'Rua das Flores',
      new Coordinates(40.7128, -74.006),
    )
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
    const address = new Address(
      '30514050',
      'MG',
      'BH',
      'Betânia',
      'Rua das Flores',
      new Coordinates(40.7128, -74.006),
    )
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
    const address = new Address(
      '30514050',
      'MG',
      'BH',
      'Betânia',
      'Rua das Flores',
      new Coordinates(40.7128, -74.006),
    )
    await companyRegistrationUseCase.execute({
      name: 'Mark I',
      ownerName: 'Mark I',
      email: 'mark.1@mail.com',
      whatsapp: '12345678910',
      password: '123456',
      address,
    })
    await expect(
      companyRegistrationUseCase.execute({
        name: 'Mark I',
        ownerName: 'Mark I',
        email: 'mark.1@mail.com',
        whatsapp: '12345678910',
        password: '123456',
        address,
      }),
    ).rejects.toThrowError('Email already exists')
  })
})
