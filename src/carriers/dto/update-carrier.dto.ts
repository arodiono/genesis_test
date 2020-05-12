export class UpdateCarrierDto {
  constructor(firstName: string, lastName: string, phone: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
  }

  firstName: string
  lastName: string
  phone: string
}
