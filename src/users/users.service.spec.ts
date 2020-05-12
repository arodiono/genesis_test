import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import { Address } from './address.entity'

describe('UsersService', () => {
  let module: TestingModule
  let service: UsersService
  let repository: Repository<User>

  beforeAll(async () => {
    module = await Test.createTestingModule({
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
    service = module.get<UsersService>(UsersService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should create user', async () => {
    const createUserDto = new CreateUserDto('firstName', 'lastName', 'phone')
    const user = new User()

    jest.spyOn(repository, 'create').mockReturnValue(user)
    jest.spyOn(repository, 'save').mockResolvedValue(user)

    expect(await service.createUser(createUserDto)).toBe(user)
  })

  it('should return user', async () => {
    const id = 1
    const user = new User()

    jest
      .spyOn(repository, 'findOneOrFail')
      .mockResolvedValue(Promise.resolve(user))

    expect(await service.getUserById(id)).toBe(user)
  })

  it('should update user', async () => {
    const updateUserDto = new UpdateUserDto('firstName', 'lastName', 'phone')
    const id = 1
    const user = new User()

    jest
      .spyOn(repository, 'findOneOrFail')
      .mockResolvedValue(Promise.resolve(user))
    jest.spyOn(repository, 'save').mockResolvedValue(user)

    expect(await service.updateUser(id, updateUserDto)).toBe(user)
  })

  it('should remove user', async () => {
    const id = 1
    const result = { raw: '', affected: 1 }

    jest.spyOn(repository, 'delete').mockResolvedValue(result)

    expect(await service.removeUser(id)).toBe(true)
  })
})
