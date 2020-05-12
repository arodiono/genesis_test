import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
import loadFixtures from './utils/loadFixtures'
import truncateTables from './utils/truncateTables'
import { CreateCarrierDto } from '../src/carriers/dto/create-carrier.dto'
import { UpdateCarrierDto } from '../src/carriers/dto/update-carrier.dto'

describe('CarriersController (e2e)', () => {
  let app: INestApplication
  let id

  beforeAll(async () => {
    await loadFixtures()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await truncateTables()

    await app.close()
  })

  it('POST: /carriers', () => {
    const createCarrierDto = new CreateCarrierDto(
      'firstName',
      'lastName',
      'phone',
    )

    return request(app.getHttpServer())
      .post('/carriers')
      .send(createCarrierDto)
      .expect(201)
      .then(response => {
        id = response.body.id
      })
  })

  it('GET: /carriers/:id', () => {
    return request(app.getHttpServer())
      .get(`/carriers/${id}`)
      .expect(200)
  })

  it('PUT: /carriers/:id', () => {
    const updateCarrierDto = new UpdateCarrierDto(
      'UfirstName',
      'UlastName',
      'Uphone',
    )

    return request(app.getHttpServer())
      .put(`/carriers/${id}`)
      .send(updateCarrierDto)
      .expect(200)
  })

  it('GET: /carriers/:id/addresses/popular', () => {
    return request(app.getHttpServer())
      .get(`/carriers/${id}/addresses/popular`)
      .expect(200)
  })

  it('GET: /carriers/:id/orders/count', () => {
    return request(app.getHttpServer())
      .get(`/carriers/${id}`)
      .expect(200)
  })

  it('GET: /carriers/:id/orders/total', () => {
    return request(app.getHttpServer())
      .get(`/carriers/${id}/orders/count`)
      .expect(200)
  })

  it('GET: /carriers/:id/orders/average', () => {
    return request(app.getHttpServer())
      .get(`/carriers/${id}/orders/average`)
      .expect(200)
  })

  it('DELETE: /carriers/:id', () => {
    return request(app.getHttpServer())
      .delete(`/carriers/${id}`)
      .expect(200)
  })
})
