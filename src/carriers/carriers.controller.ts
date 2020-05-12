import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CarriersService } from './carriers.service'
import { Carrier } from './carrier.entity'
import { CreateCarrierDto } from './dto/create-carrier.dto'
import { UpdateCarrierDto } from './dto/update-carrier.dto'

@Controller('carriers')
export class CarriersController {
  constructor(private readonly carriersService: CarriersService) {}

  @Post()
  public async create(
    @Body() createCarrierDto: CreateCarrierDto,
  ): Promise<Carrier> {
    return await this.carriersService.createCarrier(createCarrierDto)
  }

  @Get(':id([0-9]+)')
  public async get(@Param('id') id: number): Promise<Carrier> {
    return await this.carriersService.getCarrierById(id)
  }

  @Put(':id([0-9]+)')
  public async update(
    @Param('id') id: number,
    @Body() updateCarrierDto: UpdateCarrierDto,
  ): Promise<Carrier> {
    return await this.carriersService.updateCarrier(id, updateCarrierDto)
  }

  @Delete(':id([0-9]+)')
  public async remove(@Param('id') id: number) {
    await this.carriersService.removeCarrier(id)
  }

  @Get(':id([0-9]+)/addresses/popular')
  public async getPopularAddresses(@Param('id') id: number) {
    return await this.carriersService.getCarrierPopularAddresses(id)
  }

  @Get(':id([0-9]+)/orders/count')
  public async getOrdersCount(@Param('id') id: number) {
    return await this.carriersService.getCarrierOrdersCount(id)
  }

  @Get(':id([0-9]+)/orders/total')
  public async getOrdersTotal(@Param('id') id: number) {
    return await this.carriersService.getCarrierOrdersTotal(id)
  }

  @Get(':id([0-9]+)/orders/average')
  public async getOrdersAverageTime(@Param('id') id: number) {
    return await this.carriersService.getCarrierOrdersAverageTime(id)
  }
}
