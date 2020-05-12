import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateVendorDto } from './dto/create-vendor.dto'
import { VendorsService } from './vendors.service'
import { Vendor } from './vendor.entity'
import { UpdateVendorDto } from './dto/update-vendor.dto'

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  public async create(
    @Body() createVendorDto: CreateVendorDto,
  ): Promise<Vendor> {
    return await this.vendorsService.createVendor(createVendorDto)
  }

  @Get(':id([0-9]+)')
  public async get(@Param('id') id: number): Promise<Vendor> {
    return await this.vendorsService.getVendorById(id)
  }

  @Put(':id([0-9]+)')
  public async update(
    @Param('id') id: number,
    @Body() updateVendorDto: UpdateVendorDto,
  ): Promise<Vendor> {
    return await this.vendorsService.updateVendor(id, updateVendorDto)
  }

  @Delete(':id([0-9]+)')
  public async remove(@Param('id') id: number) {
    await this.vendorsService.removeVendor(id)
  }
}
