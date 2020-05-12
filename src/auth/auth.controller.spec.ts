import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import validationSchema from '../config/validationSchema'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { UsersService } from '../users/users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../users/user.entity'
import { Repository } from 'typeorm'
import { SuccessLoginDto } from './dto/success-login.dto'
import { AuthLoginDto } from './dto/auth-login.dto'
import { Address } from '../users/address.entity'

describe('Auth Controller', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema,
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        ConfigService,
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

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  it('should return auth token', async () => {
    const authLoginDto = new AuthLoginDto(1)
    const successLoginDto = new SuccessLoginDto('qwerty')

    jest.spyOn(service, 'login').mockResolvedValue(successLoginDto)

    expect(await controller.login(authLoginDto)).toEqual(successLoginDto)
  })
})
