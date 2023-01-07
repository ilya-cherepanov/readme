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
  MAIL_SMTP_HOST: Joi
    .string()
    .required(),
  MAIL_SMTP_PORT: Joi
    .number()
    .port()
    .required(),
  MAIL_SMTP_USER: Joi
    .string()
    .required(),
  MAIL_SMTP_USER_PASSWORD: Joi
    .string()
    .required(),
  MAIL_FROM: Joi
    .string()
    .email()
    .required(),
  RABBIT_USER: Joi
    .string()
    .required(),
  RABBIT_PASSWORD: Joi
    .string()
    .required(),
  RABBIT_HOST: Joi
    .string()
    .required(),
  RABBIT_NOTIFY_SERVICE_QUEUE: Joi
    .string()
    .required(),
  POST_URL_PREFIX: Joi
    .string()
    .required(),
});
