import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { VendorsService } from '../vendors/vendors.service'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly vendorsService: VendorsService,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const vendor = await this.vendorsService.getVendorById(
      createProductDto.vendorId,
    )
    const product = this.productsRepository.create(createProductDto)

    product.vendor = vendor

    return this.productsRepository.save(product)
  }

  public async getProductById(id: number): Promise<Product> {
    return this.productsRepository.findOneOrFail(id)
  }

  public async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const vendor = await this.vendorsService.getVendorById(
      updateProductDto.vendorId,
    )
    const product = await this.productsRepository.findOneOrFail(id)

    product.name = updateProductDto.name
    product.description = updateProductDto.description
    product.price = updateProductDto.price
    product.vendor = vendor

    return this.productsRepository.save(product)
  }

  public async removeProduct(id: number): Promise<void> {
    await this.productsRepository.delete(id)
  }

  public async getProductsByIds(productsIds: number[]): Promise<Product[]> {
    return this.productsRepository.findByIds(productsIds)
  }
}
