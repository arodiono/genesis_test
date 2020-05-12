import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from '../orders/order.entity'

@Entity()
export class Carrier {
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
    order => order.carrier,
  )
  @JoinColumn()
  orders: Order[]
}
