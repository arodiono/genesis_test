import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { VendorsService } from '../vendors/vendors.service'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Vendor } from '../vendors/vendor.entity'

describe('Products Controller', () => {
  let module: TestingModule
  let controller: ProductsController
  let service: ProductsService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        VendorsService,
        {
          provide: getRepositoryToken(Product),
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
    controller = module.get<ProductsController>(ProductsController)
    service = module.get<ProductsService>(ProductsService)
  })

  it('should create new product', async () => {
    const createProductDto = new CreateProductDto(
      'Product name',
      'Product desc',
      12.34,
      1,
    )
    const product = new Product()

    jest.spyOn(service, 'createProduct').mockResolvedValue(product)

    expect(await controller.create(createProductDto)).toBe(product)
  })

  it('should return product by id', async () => {
    const product = new Product()
    const id = 1

    jest.spyOn(service, 'getProductById').mockResolvedValue(product)

    expect(await controller.get(id)).toBe(product)
  })

  it('should update product by id', async () => {
    const updateProductDto = new UpdateProductDto(
      'UProduct name',
      'UProduct desc',
      56.78,
      1,
    )
    const id = 1
    const product = new Product()

    jest.spyOn(service, 'updateProduct').mockResolvedValue(product)

    expect(await controller.update(id, updateProductDto)).toBe(product)
  })

  it('should remove product', async () => {
    const id = 1

    jest.spyOn(service, 'removeProduct').mockResolvedValue(undefined)

    expect(await controller.remove(id)).toBeUndefined()
  })
})
