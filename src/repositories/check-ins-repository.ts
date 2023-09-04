import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  // CheckInUncheckedCreateInput os registros de relacionamento precisam existir no banco de dados
  // CheckInCreateInput usado para criar as entidades que se relacionam de uma vez só. o user e o gym não precisam existir anteriormente no bd
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
}
