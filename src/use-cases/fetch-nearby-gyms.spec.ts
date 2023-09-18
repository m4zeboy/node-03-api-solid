import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -20.8726671,
      longitude: -51.4834774,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -20.7602412,
      longitude: -51.6974744,
    })

    const { nearbyGyms } = await sut.execute({
      userLatitude: -20.8726671,
      userLongitude: -51.4834774,
    })
    expect(nearbyGyms).toHaveLength(1)
    expect(nearbyGyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
