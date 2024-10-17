import Company from 'src/Domain/Entities/Company'

export default interface ICompanyRepository {
  save(company: Company): Promise<Company>
  findByEmail(email: string): Promise<Company | null>
}
