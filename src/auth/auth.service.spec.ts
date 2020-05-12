import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'
import { UsersService } from '../users/users.service'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../users/user.entity'
import validationSchema from '../config/validationSchema'
import { SuccessLoginDto } from './dto/success-login.dto'
import { AuthLoginDto } from './dto/auth-login.dto'
import { Address } from '../users/address.entity'

describe('AuthService', () => {
  let service: AuthService
  let jwtService: JwtService

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

    service = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should return auth token', async () => {
    const token = 'successToken'
    const authLoginDto = new AuthLoginDto(1)
    const successLoginDto = new SuccessLoginDto(token)

    jest.spyOn(jwtService, 'sign').mockReturnValue(token)

    expect(await service.login(authLoginDto)).toEqual(successLoginDto)
  })
})
