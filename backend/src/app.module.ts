import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakStrategy } from './keycloak.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AppController],
  providers: [AppService, KeycloakStrategy],
})
export class AppModule {}
