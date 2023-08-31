import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

// Todo caso de uso tem uma tipagem de entrada e saída caso tenha sucesso, se falhar erros devem ser emitidos

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // Se a variável guarda um valor Boolean, o seu nome deve ser uma pergunta para facilitar a leitura dessa informação.
    // Escrever com semântica
    // Boolean => "is", "has", "does"
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
