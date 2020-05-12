import { Test, TestingModule } from '@nestjs/testing'
import { CarriersController } from './carriers.controller'
import { CarriersService } from './carriers.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Carrier } from './carrier.entity'
import { CreateCarrierDto } from './dto/create-carrier.dto'
import { UpdateCarrierDto } from './dto/update-carrier.dto'

describe('Carriers Controller', () => {
  let module: TestingModule
  let controller: CarriersController
  let service: CarriersService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Carrier])],
      controllers: [CarriersController],
      providers: [CarriersService],
    }).compile()
  })

  beforeEach(() => {
    controller = module.get<CarriersController>(CarriersController)
    service = module.get<CarriersService>(CarriersService)
  })

  it('should create new carrier', async () => {
    const createCarrierDto = new CreateCarrierDto(
      'firstName',
      'lastName',
      'phone',
    )
    const carrier = new Carrier()

    jest.spyOn(service, 'createCarrier').mockResolvedValue(carrier)

    expect(await controller.create(createCarrierDto)).toBe(carrier)
  })

  it('should return carrier by id', async () => {
    const carrier = new Carrier()
    const id = 1

    jest.spyOn(service, 'getCarrierById').mockResolvedValue(carrier)

    expect(await controller.get(id)).toBe(carrier)
  })

  it('should update carrier by id', async () => {
    const updateCarrierDto = new UpdateCarrierDto(
      'UfirstName',
      'UlastName',
      'Uphone',
    )
    const id = 1
    const carrier = new Carrier()

    jest.spyOn(service, 'updateCarrier').mockResolvedValue(carrier)

    expect(await controller.update(id, updateCarrierDto)).toBe(carrier)
  })

  it('should remove carrier', async () => {
    const id = 1

    jest.spyOn(service, 'removeCarrier').mockResolvedValue(true)

    expect(await controller.remove(id)).toBeUndefined()
  })
})
