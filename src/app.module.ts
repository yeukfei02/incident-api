import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { IncidentModule } from './incident/incident.module';

@Module({
  imports: [UsersModule, IncidentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
