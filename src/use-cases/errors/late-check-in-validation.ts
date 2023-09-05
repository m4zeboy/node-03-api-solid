// evitar retornar erros diferentes se aconteceram no mesmo processo por questões de segurança. (ex: autenticação)
// Para o mesmo processo, retornar o mesmo erro.
export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'The check-in can only be validated until 20 minutes of its creation.',
    )
  }
}
