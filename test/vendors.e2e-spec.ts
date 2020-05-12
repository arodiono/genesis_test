import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
import loadFixtures from './utils/loadFixtures'
import truncateTables from './utils/truncateTables'
import { CreateVendorDto } from '../src/vendors/dto/create-vendor.dto'
import { UpdateVendorDto } from '../src/vendors/dto/update-vendor.dto'

describe('VendorsController (e2e)', () => {
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

  it('POST: /vendors', () => {
    const createVendorDto = new CreateVendorDto('Vendor name')

    return request(app.getHttpServer())
      .post('/vendors')
      .send(createVendorDto)
      .expect(201)
      .then(response => {
        id = response.body.id
      })
  })

  it('GET: /vendors/:id', () => {
    return request(app.getHttpServer())
      .get(`/vendors/${id}`)
      .expect(200)
  })

  it('PUT: /vendors/:id', () => {
    const updateVendorDto = new UpdateVendorDto('Vendor name Updated')

    return request(app.getHttpServer())
      .put(`/vendors/${id}`)
      .send(updateVendorDto)
      .expect(200)
  })

  it('DELETE: /vendors/:id', () => {
    return request(app.getHttpServer())
      .delete(`/vendors/${id}`)
      .expect(200)
  })
})
