import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
import loadFixtures from './utils/loadFixtures'
import truncateTables from './utils/truncateTables'
import { CreateOrderDto } from '../src/orders/dto/create-order.dto'
import { AuthLoginDto } from '../src/auth/dto/auth-login.dto'

describe('OrdersController (e2e)', () => {
  let app: INestApplication
  let accessToken: string

  beforeAll(async done => {
    await loadFixtures()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    const authLoginDto = new AuthLoginDto(1)

    request(app.getHttpServer())
      .post('/auth/login')
      .send(authLoginDto)
      .end((err, res) => {
        accessToken = res.body.accessToken
        done()
      })
  })

  afterAll(async () => {
    await truncateTables()

    await app.close()
  })

  it('POST: /orders', () => {
    const createOrderDto = new CreateOrderDto(1, [
      {
        productId: 1,
        quantity: 1,
      },
    ])

    return request(app.getHttpServer())
      .post('/orders')
      .send(createOrderDto)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201)
  })
})
