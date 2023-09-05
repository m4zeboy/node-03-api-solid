import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './valaidate-check-int'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { LateCheckInValidationError } from './errors/late-check-in-validation'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await sut.execute({
      checkinId: createdCheckIn.id,
    })
    expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].created_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkinId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes after its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesOnMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesOnMs)

    await expect(() =>
      sut.execute({
        checkinId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
