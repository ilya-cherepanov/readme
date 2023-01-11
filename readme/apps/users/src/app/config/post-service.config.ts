import { registerAs } from "@nestjs/config";


export const postServiceOptions = registerAs('post', () => ({
  urlPrefix: process.env.POST_URL_PREFIX,
}));
