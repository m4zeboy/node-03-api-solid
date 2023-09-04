import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'typescript gym',
      description: null,
      latitude: -20.8726671,
      longitude: -51.4834774,
      phone: null,
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'javascript gym',
      description: null,
      latitude: -20.8726671,
      longitude: -51.4834774,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'typescript',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'typescript gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: `typescript gym ${i}`,
        description: null,
        latitude: -20.8726671,
        longitude: -51.4834774,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'typescript',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'typescript gym 21' }),
      expect.objectContaining({ title: 'typescript gym 22' }),
    ])
  })
})
