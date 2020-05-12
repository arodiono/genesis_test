import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Carrier } from '../carriers/carrier.entity'
import { User } from '../users/user.entity'
import { ProductToOrder } from './product-to-order.entity'
import { Address } from '../users/address.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Address)
  @JoinColumn()
  address: Address

  @Column({
    type: 'decimal',
    scale: 2,
    precision: 10,
  })
  total: number

  @ManyToOne(
    () => Carrier,
    carrier => carrier.orders,
  )
  @JoinColumn()
  carrier: Carrier

  @ManyToOne(
    () => User,
    user => user.orders,
  )
  @JoinColumn()
  user: User

  @OneToMany(
    () => ProductToOrder,
    productToOrder => productToOrder.order,
  )
  productToOrder: ProductToOrder[]

  @CreateDateColumn({
    type: 'datetime',
  })
  startTime: Date

  @Column({
    type: 'datetime',
    nullable: true,
  })
  deliveryTime: Date
}
