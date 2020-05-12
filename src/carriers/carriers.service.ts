import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Carrier } from './carrier.entity'
import { CreateCarrierDto } from './dto/create-carrier.dto'
import { UpdateCarrierDto } from './dto/update-carrier.dto'
import { Order } from '../orders/order.entity'
import { Address } from '../users/address.entity'

@Injectable()
export class CarriersService {
  constructor(
    @InjectRepository(Carrier)
    private readonly carriersRepository: Repository<Carrier>,
  ) {}

  public async createCarrier(
    createCarrierDto: CreateCarrierDto,
  ): Promise<Carrier> {
    const carrier = this.carriersRepository.create(createCarrierDto)
    return this.carriersRepository.save(carrier)
  }

  public async getCarrierById(id: number): Promise<Carrier> {
    return this.carriersRepository.findOneOrFail(id)
  }

  public async updateCarrier(
    id: number,
    updateCarrierDto: UpdateCarrierDto,
  ): Promise<Carrier> {
    const carrier = await this.carriersRepository.findOneOrFail(id)

    carrier.firstName = updateCarrierDto.firstName
    carrier.lastName = updateCarrierDto.lastName
    carrier.phone = updateCarrierDto.phone

    return this.carriersRepository.save(carrier)
  }

  public async removeCarrier(id: number): Promise<boolean> {
    return !!(await this.carriersRepository.delete(id))
  }

  public async getRandomCarrier(): Promise<Carrier> {
    return this.carriersRepository.findOne()
  }

  public async getCarrierPopularAddresses(id: number) {
    return this.carriersRepository.manager
      .getRepository(Address)
      .createQueryBuilder('address')
      .addSelect('COUNT(order.id)', 'count')
      .leftJoinAndSelect('order', 'order', 'address.id = order.address')
      .where('order.carrier = :id', { id })
      .groupBy('address.id')
      .orderBy('count', 'DESC')
      .getRawMany()
  }

  public async getCarrierOrdersCount(id: number) {
    return this.carriersRepository.manager
      .getRepository(Order)
      .createQueryBuilder('order')
      .select('COUNT(order.id)', 'count')
      .where('order.carrier = :id', { id })
      .getRawOne()
  }

  public async getCarrierOrdersTotal(id: number) {
    return this.carriersRepository.manager
      .getRepository(Order)
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'sum')
      .where('order.carrier = :id', { id })
      .getRawOne()
  }

  public async getCarrierOrdersAverageTime(id: number) {
    return this.carriersRepository.manager
      .getRepository(Order)
      .createQueryBuilder('order')
      .select(
        'AVG(TIME_TO_SEC(TIMEDIFF(`order`.`deliveryTime`,`order`.`startTime`))) / 60',
        'avg',
      )
      .where('order.carrier = :id', { id })
      .getRawOne()
  }
}
