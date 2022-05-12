import { IncidentController } from './incident.controller';
import { UsersService } from '../users/users.service';
import { IncidentService } from './incident.service';
import { PrismaService } from '../prisma.service';
import { faker } from '@faker-js/faker';
import { Status } from '@prisma/client';

describe('IncidentController', () => {
  let controller: IncidentController;
  let usersService: UsersService;
  let service: IncidentService;

  beforeEach(async () => {
    const prismaService = new PrismaService();
    usersService = new UsersService(prismaService);
    service = new IncidentService(prismaService);
    controller = new IncidentController(service);
  });

  describe('controller should be defined', () => {
    it('return success', () => {
      expect(controller).toBeDefined();
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
        incident = await controller.raiseIncident(raiseIncidentDto);
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.message).toBeDefined();
      expect(incident.incident).toBeDefined();
    });
  });

  describe('getIncidents', () => {
    let incidents: any = {};

    beforeEach(async () => {
      incidents = await controller.getIncidents();
    });

    it('return success', async () => {
      console.log('incidents = ', incidents);
      expect(incidents).toBeDefined();
      expect(incidents.message).toBeDefined();
      expect(incidents.data).toBeDefined();
    });
  });

  describe('getIncidentById', () => {
    let incident: any = {};

    beforeEach(async () => {
      const incidentList = await controller.getIncidents();
      if (incidentList) {
        const id = incidentList.data[0].id;
        incident = await controller.getIncidentById(id);
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.message).toBeDefined();
      expect(incident.incident).toBeDefined();
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

        const incidentList = await controller.getIncidents();
        if (incidentList) {
          const id = incidentList.data[0].id;
          const assignIncidentDto = {
            assignee_id: assigneeId,
          };
          incident = await controller.assignIncident(id, assignIncidentDto);
        }
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.message).toBeDefined();
      expect(incident.incident).toBeDefined();
    });
  });

  describe('updateIncidentStatus', () => {
    let incident: any = {};

    beforeEach(async () => {
      const incidentList = await controller.getIncidents();
      if (incidentList) {
        const id = incidentList.data[0].id;
        const updateIncidentStatusDto = {
          status: Status.ACKNOWLEDGE,
        };
        incident = await controller.updateIncidentStatus(
          id,
          updateIncidentStatusDto,
        );
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.message).toBeDefined();
      expect(incident.incident).toBeDefined();
    });
  });

  describe('deleteIncidentById', () => {
    let incident: any = {};

    beforeEach(async () => {
      const incidentList = await controller.getIncidents();
      if (incidentList) {
        const id = incidentList.data[0].id;
        incident = await controller.deleteIncidentById(id);
      }
    });

    it('return success', async () => {
      console.log('incident = ', incident);
      expect(incident).toBeDefined();
      expect(incident.message).toBeDefined();
      expect(incident.incident).toBeDefined();
    });
  });
});
