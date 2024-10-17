import Company from 'src/Domain/Entities/Company'
import ICompanyRepository from '../ICompanyRepository'

export default class InMemoryCompanyRepository implements ICompanyRepository {
  public companies: Company[] = []

  async save(company: Company): Promise<Company> {
    this.companies.push(company)
    return company
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = this.companies.find(
      (company) => company.getEmail() === email,
    )
    return company || null
  }
}
