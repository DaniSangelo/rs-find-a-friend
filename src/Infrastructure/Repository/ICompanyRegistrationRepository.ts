import Company from 'src/Domain/Entities/Company'

export default interface ICompanyRegistrationRepository {
  save(company: Company): Promise<Company>
}
