import { IncidentService } from './incident.service';
import { PrismaService } from '../prisma.service';

describe('IncidentService', () => {
  let service: IncidentService;

  beforeEach(async () => {
    const prismaService = new PrismaService();
    service = new IncidentService(prismaService);
  });

  describe('service should be defined', () => {
    it('return success', () => {
      expect(service).toBeDefined();
    });
  });
});
