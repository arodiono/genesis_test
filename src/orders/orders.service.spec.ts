import { Test, TestingModule } from '@nestjs/testing'
import { OrdersService } from './orders.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './order.entity'
import { ProductToOrder } from './product-to-order.entity'
import { Product } from '../products/product.entity'
import { Carrier } from '../carriers/carrier.entity'
import { User } from '../users/user.entity'
import { Address } from '../users/address.entity'
import { UsersService } from '../users/users.service'
import { ProductsService } from '../products/products.service'
import { CarriersService } from '../carriers/carriers.service'
import { Vendor } from '../vendors/vendor.entity'
import { VendorsService } from '../vendors/vendors.service'
import { CreateOrderDto } from './dto/create-order.dto'

describe('OrdersService', () => {
  let module: TestingModule
  let service: OrdersService
  let ordersRepository: Repository<Order>
  let productsToOrderRepository: Repository<ProductToOrder>
  let usersRepository: Repository<User>
  let addressesRepository: Repository<Address>
  let carriersRepository: Repository<Carrier>
  let productsRepository: Repository<Product>

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        OrdersService,
        UsersService,
        ProductsService,
        CarriersService,
        VendorsService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ProductToOrder),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Carrier),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Address),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Vendor),
          useClass: Repository,
        },
      ],
    }).compile()
  })

  beforeEach(() => {
    service = module.get<OrdersService>(OrdersService)
    ordersRepository = module.get<Repository<Order>>(getRepositoryToken(Order))
    productsToOrderRepository = module.get<Repository<ProductToOrder>>(
      getRepositoryToken(ProductToOrder),
    )
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User))
    addressesRepository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    )
    carriersRepository = module.get<Repository<Carrier>>(
      getRepositoryToken(Carrier),
    )
    productsRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    )
  })

  it('should createOrder', async () => {
    const order = new Order()
    const productToOrder = new ProductToOrder()
    const createOrderDto = new CreateOrderDto(1, [
      {
        productId: 1,
        quantity: 1,
      },
    ])
    const user = new User()
    user.id = 1
    const address = new Address()
    const carrier = new Carrier()
    const product = new Product()

    jest.spyOn(ordersRepository, 'create').mockReturnValue(order)
    jest.spyOn(ordersRepository, 'save').mockResolvedValue(order)
    jest
      .spyOn(productsToOrderRepository, 'create')
      .mockReturnValue(productToOrder)
    jest
      .spyOn(productsToOrderRepository, 'save')
      .mockResolvedValue(productToOrder)
    jest.spyOn(usersRepository, 'findOneOrFail').mockResolvedValue(user)
    jest.spyOn(usersRepository, 'findOneOrFail').mockResolvedValue(user)
    jest.spyOn(addressesRepository, 'findOneOrFail').mockResolvedValue(address)
    jest.spyOn(carriersRepository, 'findOne').mockResolvedValue(carrier)
    jest.spyOn(productsRepository, 'findOneOrFail').mockResolvedValue(product)

    expect(await service.createOrder(user, createOrderDto)).toBe(order)
  })
})
