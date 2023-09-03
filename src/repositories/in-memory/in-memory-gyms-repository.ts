import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[] = []
  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(), // usa-se assim pois se a função for chamada com um id especifico, ele vai usar esse id, se nãoa ele vai criar um novo randomUUID
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }
    this.items.push(gym)
    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }
}
