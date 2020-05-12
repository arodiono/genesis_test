import { Module } from '@nestjs/common'
import { CarriersController } from './carriers.controller'
import { CarriersService } from './carriers.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Carrier } from './carrier.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Carrier])],
  controllers: [CarriersController],
  providers: [CarriersService],
  exports: [CarriersService],
})
export class CarriersModule {}
