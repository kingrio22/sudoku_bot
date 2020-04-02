import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config-service.service';

@Global()
@Module({
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigServiceModule { }