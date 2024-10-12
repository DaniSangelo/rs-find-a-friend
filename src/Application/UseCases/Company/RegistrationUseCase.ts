import ICompanyRegistrationRepository from 'src/Infrastructure/Repository/ICompanyRegistrationRepository'
import IUseCase from '../IUseCase'
import Company from 'src/Domain/Entities/Company'

type CompanyInputDTO = {
  ownerName: string
  email: string
  CEP: string
  address: string
  whatsAppNumber: string
  password: string
}

export default class RegistrationUseCase implements IUseCase {
  companyRegistrationRepository: ICompanyRegistrationRepository

  constructor(companyRegistrationRepository: ICompanyRegistrationRepository) {
    this.companyRegistrationRepository = companyRegistrationRepository
  }

  async execute(data: CompanyInputDTO): Promise<Company> {
    const company = Company.create(
      data.ownerName,
      data.email,
      data.CEP,
      data.address,
      data.whatsAppNumber,
      data.password,
    )
    return await this.companyRegistrationRepository.save(company)
  }
}
