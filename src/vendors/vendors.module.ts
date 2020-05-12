import { Module } from '@nestjs/common'
import { VendorsController } from './vendors.controller'
import { VendorsService } from './vendors.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Vendor } from './vendor.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService],
})
export class VendorsModule {}
