import { CartItem } from '../interfaces/cart-item.interface'

export class CreateOrderDto {
  constructor(addressId: number, cart: CartItem[]) {
    this.addressId = addressId
    this.cart = cart
  }

  addressId: number
  cart: CartItem[]
}
