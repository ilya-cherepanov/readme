import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';


export async function getStaticConfig(configService: ConfigService): Promise<ServeStaticModuleOptions[]> {
  return [{
    rootPath: join(process.cwd(), configService.get<string>('upload.directory')),
    serveRoot: '/photo',
  }];
}
