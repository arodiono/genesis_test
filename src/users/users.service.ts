import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Address } from './address.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  public async getUserById(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail(id)
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id)

    user.firstName = updateUserDto.firstName
    user.lastName = updateUserDto.lastName
    user.phone = updateUserDto.phone

    return this.usersRepository.save(user)
  }

  public async removeUser(id: number): Promise<boolean> {
    return !!(await this.usersRepository.delete(id))
  }

  public async getUserAddressById(addressId: number): Promise<Address> {
    return this.addressRepository.findOneOrFail(addressId)
  }
}
