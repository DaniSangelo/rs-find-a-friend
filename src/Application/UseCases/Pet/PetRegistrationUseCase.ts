import IPetRepository from 'src/Infrastructure/Repository/IPetRepository'
import IUseCase from '../IUseCase'
import ICompanyRepository from 'src/Infrastructure/Repository/ICompanyRepository'
import Pet from 'src/Domain/Entities/Pet'
import Company from 'src/Domain/Entities/Company'

export type PetInputDTO = {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  environment: string
  companyId: string
}

export default class PetRegistrationUseCase implements IUseCase {
  petRepository: IPetRepository
  companyRepository: ICompanyRepository

  constructor(
    petRepository: IPetRepository,
    companyRespository: ICompanyRepository,
  ) {
    this.petRepository = petRepository
    this.companyRepository = companyRespository
  }

  async execute(data: PetInputDTO) {
    const company = await this.companyRepository.findById(data.companyId)
    if (!company) throw new Error('Company not found')
    const pet = Pet.create(
      data.name,
      data.about,
      data.age,
      data.size,
      data.energyLevel,
      data.environment,
      new Company(
        company.getId(),
        company.getName(),
        company.getOwnerName(),
        company.getEmail(),
        company.getWhatsApp(),
        company.getPassword(),
      ),
    )
    await this.petRepository.save(pet)
    return pet
  }
}
