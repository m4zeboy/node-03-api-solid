import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Mec Gym',
        description: 'Some Description',
        phone: '(00) 00000-0000',
        latitude: -20.8726671,
        longitude: -20.8726671,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Zac Gym',
        description: 'Some Description',
        phone: '(00) 00000-0000',
        latitude: -20.8726671,
        longitude: -20.8726671,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Mec',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Mec Gym',
      }),
    ])
  })
})
