import ICompanyRepository from 'src/Infrastructure/Repository/ICompanyRepository'
import IUseCase from '../IUseCase'
import Company from 'src/Domain/Entities/Company'
import Address from 'src/Domain/ValueObjects/Address'

type CompanyInputDTO = {
  name: string
  ownerName: string
  email: string
  whatsapp: string
  password: string
  address: Address
}

export default class RegistrationUseCase implements IUseCase {
  companyRepository: ICompanyRepository

  constructor(companyRepository: ICompanyRepository) {
    this.companyRepository = companyRepository
  }

  async execute(data: CompanyInputDTO): Promise<Company> {
    const emailExists = await this.companyRepository.findByEmail(data.email)
    if (emailExists) throw new Error('Email already exists')
    const company = Company.create(
      data.name,
      data.ownerName,
      data.email,
      data.whatsapp,
      data.password,
      data.address,
    )
    return await this.companyRepository.save(company)
  }
}
