import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { VendorsModule } from '../vendors/vendors.module'
import { VendorsService } from '../vendors/vendors.service'
import { Vendor } from '../vendors/vendor.entity'

@Module({
  imports: [
    VendorsModule,
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Vendor]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, VendorsService],
  exports: [ProductsService],
})
export class ProductsModule {}
