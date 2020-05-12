import { Test, TestingModule } from '@nestjs/testing'
import { VendorsService } from './vendors.service'
import { CreateVendorDto } from './dto/create-vendor.dto'
import { Vendor } from './vendor.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UpdateVendorDto } from './dto/update-vendor.dto'
import { Repository } from 'typeorm'

describe('VendorsService', () => {
  let module: TestingModule
  let service: VendorsService
  let repository: Repository<Vendor>

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        VendorsService,
        {
          provide: getRepositoryToken(Vendor),
          useClass: Repository,
        },
      ],
    }).compile()
  })

  beforeEach(() => {
    service = module.get<VendorsService>(VendorsService)
    repository = module.get<Repository<Vendor>>(getRepositoryToken(Vendor))
  })

  it('should create vendor', async () => {
    const createVendorDto = new CreateVendorDto('Vendor name')
    const vendor = new Vendor()

    jest.spyOn(repository, 'create').mockReturnValue(vendor)
    jest.spyOn(repository, 'save').mockResolvedValue(vendor)

    expect(await service.createVendor(createVendorDto)).toBe(vendor)
  })

  it('should return vendor', async () => {
    const id = 1
    const vendor = new Vendor()

    jest
      .spyOn(repository, 'findOneOrFail')
      .mockResolvedValue(Promise.resolve(vendor))

    expect(await service.getVendorById(id)).toBe(vendor)
  })

  it('should update vendor', async () => {
    const updateVendorDto = new UpdateVendorDto('Vendor name Updated')
    const id = 1
    const vendor = new Vendor()

    jest
      .spyOn(repository, 'findOneOrFail')
      .mockResolvedValue(Promise.resolve(vendor))
    jest.spyOn(repository, 'save').mockResolvedValue(vendor)

    expect(await service.updateVendor(id, updateVendorDto)).toBe(vendor)
  })

  it('should remove vendor', async () => {
    const id = 1
    const result = { raw: '', affected: 1 }

    jest.spyOn(repository, 'delete').mockResolvedValue(result)

    expect(await service.removeVendor(id)).toBe(true)
  })
})
