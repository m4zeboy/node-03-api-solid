// evitar retornar erros diferentes se aconteceram no mesmo processo por questões de segurança. (ex: autenticação)
// Para o mesmo processo, retornar o mesmo erro.
export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found.')
  }
}
