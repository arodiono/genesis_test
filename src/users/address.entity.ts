import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'decimal',
    scale: 8,
    precision: 10,
  })
  latitude: number

  @Column({
    type: 'decimal',
    scale: 8,
    precision: 11,
  })
  longitude: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string

  @Column({
    type: 'text',
  })
  details: string

  @ManyToOne(
    () => User,
    user => user.addresses,
  )
  @JoinColumn()
  user: User
}
