import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [IncidentController],
  providers: [IncidentService, PrismaService],
})
export class IncidentModule {}
