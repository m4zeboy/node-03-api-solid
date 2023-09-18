import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const { id } = await prisma.gym.create({
      data: {
        title: 'Mec Gym',
        latitude: -20.8726671,
        longitude: -20.8726671,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${id}/check-ins/`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -20.8726671,
        longitude: -20.8726671,
      })

    expect(response.statusCode).toEqual(201)
  })
})
