export class CreateProductDto {
  constructor(
    name: string,
    description: string,
    price: number,
    vendorId: number,
  ) {
    this.name = name
    this.description = description
    this.price = price
    this.vendorId = vendorId
  }

  name: string
  description: string
  price: number
  vendorId: number
}
