import Company from 'src/Domain/Entities/Company'
import ICompanyRepository from '../ICompanyRepository'
import { prisma } from 'src/Infrastructure/Database/Prisma'
import { Company as CompanyTable } from '@prisma/client'

export class CompanyRepository implements ICompanyRepository {
  async save(company: Company): Promise<Company> {
    const address = company.getAddress()
      ? {
          create: {
            zipCode: company.getAddress()?.getZipCode(),
            state: company.getAddress()?.getState(),
            city: company.getAddress()?.getCity(),
            neighborhood: company.getAddress()?.getNeighborhood(),
            street: company.getAddress()?.getStreet(),
            latitude: company.getAddress()?.getCoordinates().getLatitude(),
            longitude: company.getAddress()?.getCoordinates().getLongitude(),
          },
        }
      : undefined

    await prisma.company.create({
      data: {
        name: company.getName(),
        ownerName: company.getOwnerName(),
        email: company.getEmail(),
        whatsapp: company.getWhatsApp(),
        password: company.getPassword(),
        address,
      },
    })
    return company
  }

  async findByEmail(email: string): Promise<CompanyTable | null> {
    const company = await prisma.company.findUnique({ where: { email } })
    return company
  }

  async findById(id: string): Promise<Company | null> {
    const dbCompany = await prisma.company.findUnique({ where: { id } })
    return !dbCompany
      ? null
      : new Company(
          dbCompany.id,
          dbCompany?.name,
          dbCompany?.ownerName,
          dbCompany?.email,
          dbCompany?.whatsapp,
          dbCompany?.password,
        )
  }
}
