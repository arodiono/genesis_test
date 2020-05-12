import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrdersService } from './orders.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  public async create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user, createOrderDto)
  }
}
