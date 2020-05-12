import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './order.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { ProductsService } from '../products/products.service'
import { ProductToOrder } from './product-to-order.entity'
import { CarriersService } from '../carriers/carriers.service'
import { User } from '../users/user.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(ProductToOrder)
    private readonly productToOrderRepository: Repository<ProductToOrder>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly carriersService: CarriersService,
  ) {}

  public async createOrder(
    user: User,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const address = await this.usersService.getUserAddressById(
      createOrderDto.addressId,
    )
    const carrier = await this.carriersService.getRandomCarrier()

    let order = this.ordersRepository.create()
    order.address = address
    order.carrier = carrier
    order.user = user
    order.productToOrder = []
    order.total = 0

    order = await this.ordersRepository.save(order)

    let total = 0
    for (const item of createOrderDto.cart) {
      const product = await this.productsService.getProductById(item.productId)
      const productToOrder = this.productToOrderRepository.create({
        order,
        product,
        quantity: item.quantity,
      })

      order.productToOrder.push(productToOrder)

      total += product.price * item.quantity
    }

    order.total = total

    // todo: remove. only for testing
    const date = new Date()
    date.setTime(date.getTime() + Math.random() * 60 * 60 * 1000)
    order.deliveryTime = date

    await this.productToOrderRepository.save(order.productToOrder)
    return this.ordersRepository.save(order)
  }
}
