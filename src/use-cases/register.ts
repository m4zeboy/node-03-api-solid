import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import type { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  // ao colocar a keyword de visibilidade (private) no construtor,
  // não é necessário fazer a atribuição manual do campo dentro do método construtor
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // o hash é uma abordagem que só é possível "ir", não é possível voltar e descriptografar um hash.
    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
