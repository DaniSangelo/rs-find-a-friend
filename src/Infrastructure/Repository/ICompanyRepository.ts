import Company from 'src/Domain/Entities/Company'

export default interface ICompanyRepository {
  save(company: Company): Promise<unknown>
  findByEmail(email: string): Promise<unknown | null>
}
