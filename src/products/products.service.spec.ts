import { Test, TestingModule } from '@nestjs/testing'
import { ProductsService } from './products.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { VendorsService } from '../vendors/vendors.service'
import { Vendor } from '../vendors/vendor.entity'
import { Repository } from 'typeorm'

describe('ProductsService', () => {
  let module: TestingModule
  let service: ProductsService
  let productRepository: Repository<Product>
  let vendorRepository: Repository<Vendor>

  beforeAll(async () => {
    module = await Test.createTestingModule({
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
    service = module.get<ProductsService>(ProductsService)
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    )
    vendorRepository = module.get<Repository<Vendor>>(
      getRepositoryToken(Vendor),
    )
  })

  it('should create product', async () => {
    const createProductDto = new CreateProductDto(
      'Product name',
      'Product desc',
      12.34,
      1,
    )
    const product = new Product()
    const vendor = new Vendor()

    jest.spyOn(vendorRepository, 'findOneOrFail').mockResolvedValue(vendor)
    jest.spyOn(productRepository, 'create').mockReturnValue(product)
    jest.spyOn(productRepository, 'save').mockResolvedValue(product)

    expect(await service.createProduct(createProductDto)).toBe(product)
  })

  it('should return product', async () => {
    const id = 1
    const product = new Product()

    jest.spyOn(productRepository, 'findOneOrFail').mockResolvedValue(product)

    expect(await service.getProductById(id)).toBe(product)
  })

  it('should update product', async () => {
    const updateProductDto = new UpdateProductDto(
      'UProduct name',
      'UProduct desc',
      56.78,
      1,
    )
    const id = 1
    const product = new Product()
    const vendor = new Vendor()

    jest.spyOn(vendorRepository, 'findOneOrFail').mockResolvedValue(vendor)
    jest.spyOn(productRepository, 'findOneOrFail').mockResolvedValue(product)
    jest.spyOn(productRepository, 'save').mockResolvedValue(product)

    expect(await service.updateProduct(id, updateProductDto)).toBe(product)
  })

  it('should remove product', async () => {
    const id = 1
    const deleteResult = { raw: '', affected: 1 }

    jest.spyOn(productRepository, 'delete').mockResolvedValue(deleteResult)

    expect(await service.removeProduct(id)).toBeUndefined()
  })
})
