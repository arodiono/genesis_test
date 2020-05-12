import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { VendorsModule } from './vendors/vendors.module'
import { ProductsModule } from './products/products.module'
import { CarriersModule } from './carriers/carriers.module'
import { OrdersModule } from './orders/orders.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import validationSchema from './config/validationSchema'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get('TYPEORM_CONNECTION'),
          host: configService.get('TYPEORM_HOST'),
          port: configService.get('TYPEORM_PORT'),
          username: configService.get('TYPEORM_USERNAME'),
          password: configService.get('TYPEORM_PASSWORD'),
          database: configService.get('TYPEORM_DATABASE'),
          logging: configService.get('TYPEORM_LOGGING'),
          synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
          charset: 'utf8mb4',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          bigNumberStrings: false,
        } as TypeOrmModuleAsyncOptions),
      inject: [ConfigService],
    }),
    VendorsModule,
    ProductsModule,
    CarriersModule,
    OrdersModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
