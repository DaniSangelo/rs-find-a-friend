import Pet from 'src/Domain/Entities/Pet'
import IPetRepository from '../IPetRepository'
import { prisma } from 'src/Infrastructure/Database/Prisma'

export class PetRepository implements IPetRepository {
  async save(pet: Pet): Promise<Pet> {
    await prisma.pet.create({
      data: {
        id: pet.id,
        name: pet.getName(),
        age: pet.getAge(),
        about: pet.getAbout(),
        size: pet.getSize(),
        energy_level: pet.getEnergyLevel(),
        environment: pet.getEnvironment(),
        company_id: pet.getCompany().getId(),
      },
    })
    return pet
  }
}
