import { Test, TestingModule } from '@nestjs/testing'
import { CarriersService } from './carriers.service'
import { CreateCarrierDto } from './dto/create-carrier.dto'
import { Carrier } from './carrier.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UpdateCarrierDto } from './dto/update-carrier.dto'
import { Repository } from 'typeorm'

describe('CarriersService', () => {
  let module: TestingModule
  let service: CarriersService
  let repository: Repository<Carrier>

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        CarriersService,
        {
          provide: getRepositoryToken(Carrier),
          useClass: Repository,
        },
      ],
    }).compile()
  })

  beforeEach(() => {
    service = module.get<CarriersService>(CarriersService)
    repository = module.get<Repository<Carrier>>(getRepositoryToken(Carrier))
  })

  it('should create carrier', async () => {
    const createCarrierDto = new CreateCarrierDto(
      'firstName',
      'lastName',
      'phone',
    )
    const carrier = new Carrier()

    jest.spyOn(repository, 'create').mockReturnValue(carrier)
    jest.spyOn(repository, 'save').mockResolvedValue(carrier)

    expect(await service.createCarrier(createCarrierDto)).toBe(carrier)
  })

  it('should return carrier', async () => {
    const id = 1
    const carrier = new Carrier()

    jest
      .spyOn(repository, 'findOneOrFail')
      .mockResolvedValue(Promise.resolve(carrier))

    expect(await service.getCarrierById(id)).toBe(carrier)
  })

  it('should update carrier', async () => {
    const updateCarrierDto = new UpdateCarrierDto(
      'UfirstName',
      'UlastName',
      'Uphone',
    )
    const id = 1
    const carrier = new Carrier()

    jest
      .spyOn(repository, 'findOneOrFail')
      .mockResolvedValue(Promise.resolve(carrier))
    jest.spyOn(repository, 'save').mockResolvedValue(carrier)

    expect(await service.updateCarrier(id, updateCarrierDto)).toBe(carrier)
  })

  it('should remove carrier', async () => {
    const id = 1
    const result = { raw: '', affected: 1 }

    jest.spyOn(repository, 'delete').mockResolvedValue(result)

    expect(await service.removeCarrier(id)).toBe(true)
  })
})
