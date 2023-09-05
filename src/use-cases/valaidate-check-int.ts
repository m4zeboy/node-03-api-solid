import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceError } from './errors/max-distance'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation'

// Todo caso de uso tem uma tipagem de entrada e saída caso tenha sucesso, se falhar erros devem ser emitidos

interface ValidateCheckInUseCaseRequest {
  checkinId: string
}

type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkinId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkinId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
