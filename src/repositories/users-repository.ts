import { Prisma, User } from '@prisma/client'

// Sempre comece pela interface (Contratos)
// No repositório Faça métodos mais específicos

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
