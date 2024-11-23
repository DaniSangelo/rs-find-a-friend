import ICompanyRepository from 'src/Infrastructure/Repository/ICompanyRepository'
import IUseCase from '../IUseCase'
import Company, { CompanyAddressDTO } from 'src/Domain/Entities/Company'
import { UserAlreadyExistsException } from '../Exceptions/UserAlreadyExistsException'

export type CompanyInputDTO = {
  name: string
  ownerName: string
  email: string
  whatsapp: string
  password: string
  address: CompanyAddressDTO
}

export default class RegistrationUseCase implements IUseCase {
  companyRepository: ICompanyRepository

  constructor(companyRepository: ICompanyRepository) {
    this.companyRepository = companyRepository
  }

  async execute(data: CompanyInputDTO) {
    const emailExists = await this.companyRepository.findByEmail(data.email)
    if (emailExists) throw new UserAlreadyExistsException()
    const company = Company.create(
      data.name,
      data.ownerName,
      data.email,
      data.whatsapp,
      data.password,
      data.address,
    )
    await this.companyRepository.save(company)
    return company
  }
}
