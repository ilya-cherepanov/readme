import * as Joi from 'joi';


export default Joi.object({
  MONGO_DB: Joi
    .string()
    .required(),
  MONGO_HOST: Joi
    .string()
    .required(),
  MONGO_PORT: Joi
    .number()
    .port()
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASSWORD: Joi
    .string()
    .required(),
  MONGO_AUTH_BASE: Joi
    .string()
    .required(),
  JWT_SECRET: Joi
    .string()
    .required(),
});
