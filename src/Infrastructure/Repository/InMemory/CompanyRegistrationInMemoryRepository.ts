import Company from 'src/Domain/Entities/Company'
import ICompanyRegistrationRepository from '../ICompanyRegistrationRepository'

export default class CompanyRegistrationInMemoryRepository
  implements ICompanyRegistrationRepository
{
  public companies: Company[] = []

  async save(company: Company): Promise<Company> {
    this.companies.push(company)
    return company
  }
}
