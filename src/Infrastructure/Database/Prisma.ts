import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})
