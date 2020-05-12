import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from '../orders/order.entity'
import { Address } from './address.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  firstName: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  lastName: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  phone: string

  @OneToMany(
    () => Order,
    order => order.user,
  )
  @JoinColumn()
  orders: Order[]

  @OneToMany(
    () => Address,
    address => address.user,
  )
  @JoinColumn()
  addresses: Address[]
}
