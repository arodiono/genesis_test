import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SuccessLoginDto } from './dto/success-login.dto'
import { AuthLoginDto } from './dto/auth-login.dto'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(authLoginDto: AuthLoginDto): Promise<SuccessLoginDto> {
    const token = this.jwtService.sign(authLoginDto)
    return new SuccessLoginDto(token)
  }
}
