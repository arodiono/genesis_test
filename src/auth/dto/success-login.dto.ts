export class SuccessLoginDto {
  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  accessToken: string
}
