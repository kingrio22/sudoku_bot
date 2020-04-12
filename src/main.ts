import * as chalk from 'chalk';
import { AppModule } from './app.module';
import { ConfigService } from './config-service/config-service.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get('PORT');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../sudoku/src/public'));
  app.setBaseViewsDir(join(__dirname, '..', '/src/sudoku/frontend'));
  app.setViewEngine('hbs');

  await app.listen(port);
  console.log(chalk.greenBright('app running on port ', port));
}
bootstrap();
