import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from './product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  public async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductDto)
  }

  @Get(':id([0-9]+)')
  public async get(@Param('id') id: number): Promise<Product> {
    return await this.productsService.getProductById(id)
  }

  @Put(':id([0-9]+)')
  public async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto)
  }

  @Delete(':id([0-9]+)')
  public async remove(@Param('id') id: number) {
    await this.productsService.removeProduct(id)
  }
}
