import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
import loadFixtures from './utils/loadFixtures'
import truncateTables from './utils/truncateTables'
import { CreateProductDto } from '../src/products/dto/create-product.dto'
import { UpdateProductDto } from '../src/products/dto/update-product.dto'

describe('ProductsController (e2e)', () => {
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

  it('POST: /products', () => {
    const createProductDto = new CreateProductDto(
      'Product name',
      'Product description',
      12.34,
      1,
    )

    return request(app.getHttpServer())
      .post('/products')
      .send(createProductDto)
      .expect(201)
      .then(response => {
        id = response.body.id
      })
  })

  it('GET: /products/:id', () => {
    return request(app.getHttpServer())
      .get(`/products/${id}`)
      .expect(200)
  })

  it('PUT: /products/:id', () => {
    const updateProductDto = new UpdateProductDto(
      'Product name',
      'Product description',
      12.34,
      1,
    )

    return request(app.getHttpServer())
      .put(`/products/${id}`)
      .send(updateProductDto)
      .expect(200)
  })

  it('DELETE: /products/:id', () => {
    return request(app.getHttpServer())
      .delete(`/products/${id}`)
      .expect(200)
  })
})
