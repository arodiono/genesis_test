import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
import loadFixtures from './utils/loadFixtures'
import truncateTables from './utils/truncateTables'
import { CreateUserDto } from '../src/users/dto/create-user.dto'
import { UpdateUserDto } from '../src/users/dto/update-user.dto'

describe('UsersController (e2e)', () => {
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

  it('POST: /users', () => {
    const createUserDto = new CreateUserDto('firstName', 'lastName', 'phone')

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
      .then(response => {
        id = response.body.id
      })
  })

  it('GET: /users/:id', () => {
    return request(app.getHttpServer())
      .get(`/users/${id}`)
      .expect(200)
  })

  it('PUT: /users/:id', () => {
    const updateUserDto = new UpdateUserDto('UfirstName', 'UlastName', 'Uphone')

    return request(app.getHttpServer())
      .put(`/users/${id}`)
      .send(updateUserDto)
      .expect(200)
  })

  it('DELETE: /users/:id', () => {
    return request(app.getHttpServer())
      .delete(`/users/${id}`)
      .expect(200)
  })
})
