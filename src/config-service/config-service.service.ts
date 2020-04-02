import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    if (
      process.env.NODE_ENV === 'develop' ||
      process.env.NODE_ENV === 'local'
    ) {
      this.envConfig = dotenv.parse(
        fs.readFileSync('.env.' + process.env.NODE_ENV),
      );
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
