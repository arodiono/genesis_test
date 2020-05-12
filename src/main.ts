import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.use(helmet())

  await app.listen(configService.get('APP_PORT'), configService.get('APP_HOST'))
}

bootstrap()
