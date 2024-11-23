import Company from 'src/Domain/Entities/Company'
import ICompanyRepository from '../ICompanyRepository'
import { prisma } from 'src/Infrastructure/Database/Prisma'
import { Company as CompanyTable } from '@prisma/client'

export class CompanyRepository implements ICompanyRepository {
  async save(company: Company): Promise<Company> {
    await prisma.company.create({
      data: {
        name: company.getName(),
        ownerName: company.getOwnerName(),
        email: company.getEmail(),
        whatsapp: company.getWhatsApp(),
        password: company.getPassword(),
        // address: {
        //   create: {
        //     zipCode: company.address.zipCode,
        //     state: company.address.state,
        //     city: company.address.city,
        //     neighborhood: company.address.neighborhood,
        //     street: company.address.street,
        //     latitude: company.address.latitude,
        //     longitude: company.address.longitude,
        //   },
        // },
      },
    })
    return company
  }

  async findByEmail(email: string): Promise<CompanyTable | null> {
    const company = await prisma.company.findUnique({ where: { email } })
    return company
  }
}
