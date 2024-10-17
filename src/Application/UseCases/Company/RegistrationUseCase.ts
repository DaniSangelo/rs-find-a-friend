import ICompanyRegistrationRepository from 'src/Infrastructure/Repository/ICompanyRegistrationRepository'
import IUseCase from '../IUseCase'
import Company from 'src/Domain/Entities/Company'

type CompanyInputDTO = {
  name: string
  ownerName: string
  email: string
  whatsapp: string
  password: string
}

export default class RegistrationUseCase implements IUseCase {
  companyRegistrationRepository: ICompanyRegistrationRepository

  constructor(companyRegistrationRepository: ICompanyRegistrationRepository) {
    this.companyRegistrationRepository = companyRegistrationRepository
  }

  async execute(data: CompanyInputDTO): Promise<Company> {
    const company = Company.create(
      data.name,
      data.ownerName,
      data.email,
      data.whatsapp,
      data.password,
    )
    return await this.companyRegistrationRepository.save(company)
  }
}
