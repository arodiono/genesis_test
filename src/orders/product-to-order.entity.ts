import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'
import { Product } from '../products/product.entity'

@Entity()
export class ProductToOrder {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Order,
    order => order.productToOrder,
  )
  order: Order

  @ManyToOne(
    () => Product,
    product => product.productToOrder,
  )
  product: Product

  @Column({
    type: 'int',
  })
  quantity: number
}
