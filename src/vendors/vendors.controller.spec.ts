import { Test, TestingModule } from '@nestjs/testing'
import { VendorsController } from './vendors.controller'
import { VendorsService } from './vendors.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Vendor } from './vendor.entity'
import { CreateVendorDto } from './dto/create-vendor.dto'
import { UpdateVendorDto } from './dto/update-vendor.dto'

describe('Vendors Controller', () => {
  let module: TestingModule
  let controller: VendorsController
  let service: VendorsService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Vendor])],
      controllers: [VendorsController],
      providers: [VendorsService],
    }).compile()
  })

  beforeEach(() => {
    controller = module.get<VendorsController>(VendorsController)
    service = module.get<VendorsService>(VendorsService)
  })

  it('should create new vendor', async () => {
    const createVendorDto = new CreateVendorDto('Vendor name')
    const vendor = new Vendor()

    jest.spyOn(service, 'createVendor').mockResolvedValue(vendor)

    expect(await controller.create(createVendorDto)).toBe(vendor)
  })

  it('should return vendor by id', async () => {
    const vendor = new Vendor()
    const id = 1

    jest.spyOn(service, 'getVendorById').mockResolvedValue(vendor)

    expect(await controller.get(id)).toBe(vendor)
  })

  it('should update vendor by id', async () => {
    const updateVendorDto = new UpdateVendorDto('Vendor name Updated')
    const id = 1
    const vendor = new Vendor()

    jest.spyOn(service, 'updateVendor').mockResolvedValue(vendor)

    expect(await controller.update(id, updateVendorDto)).toBe(vendor)
  })

  it('should remove vendor', async () => {
    const id = 1

    jest.spyOn(service, 'removeVendor').mockResolvedValue(true)

    expect(await controller.remove(id)).toBeUndefined()
  })
})
