export const SALT_ROUNDS = 10;
export const ENV_FILE_PATH = 'environments/.users.env';
export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
export const AVATAR_FILE_TYPES = /jpg|jpeg|png/;
export const AVATAR_FILE_SIZE = 1024 * 500;
export const REFRESH_TOKEN_NOT_DEFINED = 'Refresh token is not defined!';
export const REFRESH_TOKEN_NOT_MATCH = 'Refresh token does not match!';
export const JWT_AUTH_TOKEN_EXPIRES_IN = '300s';
export const JWT_REFRESH_TOKEN_EXPIRES_IN = '7d';

export const enum Name {
  MinLength = 3,
  MaxLength = 50,
}

export const enum Password {
  MinLength = 6,
  MaxLength = 12,
}
