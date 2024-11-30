import PetRegistrationUseCase from 'src/Application/UseCases/Pet/PetRegistrationUseCase'
import Company from 'src/Domain/Entities/Company'
import InMemoryCompanyRepository from 'src/Infrastructure/Repository/InMemory/InMemoryCompanyRepository'
import InMemoryPetRepository from 'src/Infrastructure/Repository/InMemory/InMemoryPetRepository'
import { describe, beforeEach, it, expect } from 'vitest'

describe('Pet registration use case', () => {
  let companyRepository: InMemoryCompanyRepository
  let petRepository: InMemoryPetRepository
  let petRegistrationUseCase: PetRegistrationUseCase

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    petRepository = new InMemoryPetRepository()
    petRegistrationUseCase = new PetRegistrationUseCase(
      petRepository,
      companyRepository,
    )
  })

  it('should be able to create a new pet', async () => {
    const address = {
      zipCode: '30514030',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      neighborhood: 'Betânia',
      street: 'Rua das Flores',
      latitude: -40.7128,
      longitude: -74.006,
    }
    const company = Company.create(
      'Mark I',
      'Mark I',
      'mark@mail.com',
      '12345678910',
      '123456',
      address,
    )
    await companyRepository.save(company)
    const pet = await petRegistrationUseCase.execute({
      name: 'Rex',
      about: 'Rex is a sweet dog and he likes to play a lot outdoor',
      age: '6',
      size: '1',
      energyLevel: '4',
      environment: 'house',
      companyId: company.id,
    })

    expect(petRepository.pets).toHaveLength(1)
  })

  it('should not be able to create a new pet with a non-existing org', async () => {
    const pet = {
      name: 'Rex',
      about: 'Rex is a sweet dog and he likes to play a lot outdoor',
      age: '6',
      size: '1',
      energyLevel: '4',
      environment: 'house',
      companyId: crypto.randomUUID(),
    }

    await expect(() => petRegistrationUseCase.execute(pet)).rejects.toThrow(
      'Company not found',
    )
  })
})
