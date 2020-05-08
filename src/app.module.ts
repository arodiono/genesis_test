import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import validationSchema from './config/validationSchema'

@Module({
  imports: [ConfigModule.forRoot({
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
