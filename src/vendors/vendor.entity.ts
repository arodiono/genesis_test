import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from '../products/product.entity'

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string

  @OneToMany(
    () => Product,
    product => product.vendor,
  )
  @JoinColumn()
  products: Product[]
}
