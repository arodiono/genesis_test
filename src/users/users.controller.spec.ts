import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import { Address } from './address.entity'

describe('Users Controller', () => {
  let module: TestingModule
  let controller: UsersController
  let service: UsersService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Address),
          useClass: Repository,
        },
      ],
    }).compile()
  })

  beforeEach(() => {
    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  it('should create new user', async () => {
    const createUserDto = new CreateUserDto('firstName', 'lastName', 'phone')
    const user = new User()

    jest.spyOn(service, 'createUser').mockResolvedValue(user)

    expect(await controller.create(createUserDto)).toBe(user)
  })

  it('should return user by id', async () => {
    const user = new User()
    const id = 1

    jest.spyOn(service, 'getUserById').mockResolvedValue(user)

    expect(await controller.get(id)).toBe(user)
  })

  it('should update user by id', async () => {
    const updateUserDto = new UpdateUserDto('UfirstName', 'UlastName', 'Uphone')
    const id = 1
    const user = new User()

    jest.spyOn(service, 'updateUser').mockResolvedValue(user)

    expect(await controller.update(id, updateUserDto)).toBe(user)
  })

  it('should remove user', async () => {
    const id = 1

    jest.spyOn(service, 'removeUser').mockResolvedValue(true)

    expect(await controller.remove(id)).toBeUndefined()
  })
})
