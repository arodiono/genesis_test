import { Injectable } from '@nestjs/common'
import { Vendor } from './vendor.entity'
import { CreateVendorDto } from './dto/create-vendor.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateVendorDto } from './dto/update-vendor.dto'

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorsRepository: Repository<Vendor>,
  ) {}

  public async createVendor(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendor = this.vendorsRepository.create(createVendorDto)
    return this.vendorsRepository.save(vendor)
  }

  public async getVendorById(id: number): Promise<Vendor> {
    return this.vendorsRepository.findOneOrFail(id)
  }

  public async updateVendor(
    id: number,
    updateVendorDto: UpdateVendorDto,
  ): Promise<Vendor> {
    const vendor = await this.vendorsRepository.findOneOrFail(id)

    vendor.name = updateVendorDto.name

    return this.vendorsRepository.save(vendor)
  }

  public async removeVendor(id: number): Promise<boolean> {
    return !!(await this.vendorsRepository.delete(id))
  }
}
