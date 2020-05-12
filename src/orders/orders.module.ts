import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './order.entity'
import { ProductToOrder } from './product-to-order.entity'
import { UsersModule } from '../users/users.module'
import { ProductsModule } from '../products/products.module'
import { CarriersModule } from '../carriers/carriers.module'

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CarriersModule,
    TypeOrmModule.forFeature([Order, ProductToOrder]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
