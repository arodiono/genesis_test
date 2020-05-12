import * as Joi from '@hapi/joi'

const validationSchema = Joi.object({
  APP_HOST: Joi.string()
    .hostname()
    .default('localhost'),
  APP_PORT: Joi.number().default(3000),
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_HOST: Joi.string().default('localhost'),
  TYPEORM_PORT: Joi.number().default(3306),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
  TYPEORM_LOGGING: Joi.string().required(),
  TYPEORM_ENTITIES: Joi.string().required(),
  TYPEORM_MIGRATIONS: Joi.string().required(),
  TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
})

export default validationSchema
