import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Vendor } from '../vendors/vendor.entity'
import { ProductToOrder } from '../orders/product-to-order.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string

  @Column({
    type: 'text',
  })
  description: string

  @Column({
    type: 'decimal',
    scale: 2,
    precision: 10,
  })
  price: number

  @ManyToOne(
    () => Vendor,
    vendor => vendor.products,
  )
  @JoinColumn()
  vendor: Vendor

  @OneToMany(
    () => ProductToOrder,
    productToOrder => productToOrder.product,
  )
  productToOrder: ProductToOrder
}
