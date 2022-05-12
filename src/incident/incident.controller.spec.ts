import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { PrismaService } from '../prisma.service';

describe('IncidentController', () => {
  let controller: IncidentController;
  let service: IncidentService;

  beforeEach(async () => {
    const prismaService = new PrismaService();
    service = new IncidentService(prismaService);
    controller = new IncidentController(service);
  });

  describe('controller should be defined', () => {
    it('return success', () => {
      expect(controller).toBeDefined();
    });
  });
});
