import * as Joi from 'joi';


export default Joi.object({
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
  UPLOAD_FILES_DIR: Joi
    .string()
    .required(),
  JWT_ACCESS_SECRET: Joi
    .string()
    .required(),
});
