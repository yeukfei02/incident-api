import { UsersService } from '../users/users.service';
import { IncidentService } from './incident.service';
import { PrismaService } from '../prisma.service';
import { faker } from '@faker-js/faker';
import { Status } from '@prisma/client';

describe('IncidentService', () => {
  let usersService: UsersService;
  let service: IncidentService;

  beforeEach(async () => {
    const prismaService = new PrismaService();
    usersService = new UsersService(prismaService);
    service = new IncidentService(prismaService);
  });

  describe('service should be defined', () => {
    it('return success', () => {
      expect(service).toBeDefined();
    });
  });

  describe('raiseIncident', () => {
    let incident: any = {};

    beforeEach(async () => {
      let users = await usersService.getUsers(1, 20);
      if (users) {
        users = users.filter((item: any) => {
          return item.is_admin;
        });
        const creatorId = users[0].id;

        const raiseIncidentDto = {
          name: faker.name.findName(),
          type: faker.lorem.word(),
          creator_id: creatorId,
        };
        incident = await service.raiseIncident(raiseIncidentDto);
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.id).toBeDefined();
      expect(incident.name).toBeDefined();
      expect(incident.type).toBeDefined();
      expect(incident.status).toBeDefined();
      expect(incident.creator_id).toBeDefined();
      expect(incident.assignee_id).toEqual(null);
      expect(incident.created_at).toBeDefined();
      expect(incident.updated_at).toBeDefined();
    });
  });

  describe('getIncidents', () => {
    let incidents: any = {};

    beforeEach(async () => {
      incidents = await service.getIncidents(
        '',
        '',
        '',
        '',
        null,
        1,
        20,
        'created_at',
        'desc',
      );
    });

    it('return success', async () => {
      console.log('incidents = ', incidents);
      expect(incidents).toBeDefined();

      for (let index = 0; index < incidents.length; index++) {
        const item = incidents[index];

        expect(item.id).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.type).toBeDefined();
        expect(item.creator_id).toBeDefined();
        expect(item.assignee_id).toBeDefined();
        expect(item.created_at).toBeDefined();
        expect(item.updated_at).toBeDefined();
      }
    });
  });

  describe('getIncidentById', () => {
    let incident: any = {};

    beforeEach(async () => {
      const incidentList = await service.getIncidents(
        '',
        '',
        '',
        '',
        null,
        1,
        20,
        'created_at',
        'desc',
      );
      if (incidentList) {
        const id = incidentList[0].id;
        incident = await service.getIncidentById(id);
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.id).toBeDefined();
      expect(incident.name).toBeDefined();
      expect(incident.type).toBeDefined();
      expect(incident.status).toBeDefined();
      expect(incident.creator_id).toBeDefined();
      expect(incident.assignee_id).toBeDefined();
      expect(incident.created_at).toBeDefined();
      expect(incident.updated_at).toBeDefined();
    });
  });

  describe('assignIncident', () => {
    let incident: any = {};

    beforeEach(async () => {
      let users = await usersService.getUsers(1, 20);
      if (users) {
        users = users.filter((item: any) => {
          return !item.is_admin;
        });
        const assigneeId = users[0].id;

        const incidentList = await service.getIncidents(
          '',
          '',
          '',
          '',
          null,
          1,
          20,
          'created_at',
          'desc',
        );
        if (incidentList) {
          const id = incidentList[0].id;
          const assignIncidentDto = {
            assignee_id: assigneeId,
          };
          incident = await service.assignIncident(id, assignIncidentDto);
        }
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.id).toBeDefined();
      expect(incident.name).toBeDefined();
      expect(incident.type).toBeDefined();
      expect(incident.status).toBeDefined();
      expect(incident.creator_id).toBeDefined();
      expect(incident.assignee_id).toBeDefined();
      expect(incident.created_at).toBeDefined();
      expect(incident.updated_at).toBeDefined();
    });
  });

  describe('updateIncidentStatus', () => {
    let incident: any = {};

    beforeEach(async () => {
      const incidentList = await service.getIncidents(
        '',
        '',
        '',
        '',
        null,
        1,
        20,
        'created_at',
        'desc',
      );
      if (incidentList) {
        const id = incidentList[0].id;
        const updateIncidentStatusDto = {
          status: Status.ACKNOWLEDGE,
        };
        incident = await service.updateIncidentStatus(
          id,
          updateIncidentStatusDto,
        );
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.id).toBeDefined();
      expect(incident.name).toBeDefined();
      expect(incident.type).toBeDefined();
      expect(incident.status).toBeDefined();
      expect(incident.creator_id).toBeDefined();
      expect(incident.assignee_id).toBeDefined();
      expect(incident.created_at).toBeDefined();
      expect(incident.updated_at).toBeDefined();
    });
  });

  describe('deleteIncidentById', () => {
    let incident: any = {};

    beforeEach(async () => {
      const incidentList = await service.getIncidents(
        '',
        '',
        '',
        '',
        null,
        1,
        20,
        'created_at',
        'desc',
      );
      if (incidentList) {
        const id = incidentList[0].id;
        incident = await service.deleteIncidentById(id);
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.id).toBeDefined();
      expect(incident.name).toBeDefined();
      expect(incident.type).toBeDefined();
      expect(incident.status).toBeDefined();
      expect(incident.creator_id).toBeDefined();
      expect(incident.assignee_id).toBeDefined();
      expect(incident.created_at).toBeDefined();
      expect(incident.updated_at).toBeDefined();
    });
  });
});
