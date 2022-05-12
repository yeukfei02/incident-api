import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RaiseIncidentDto } from './dto/raise-incident.dto';
import { AssignIncidentDto } from './dto/assign-incident.dto';
import { UpdateIncidentStatusDto } from './dto/update-incident-status.dto';
import { Status } from '@prisma/client';

@Injectable()
export class IncidentService {
  constructor(private readonly prisma: PrismaService) {}

  async raiseIncident(raiseIncidentDto: RaiseIncidentDto): Promise<any> {
    let incident = null;

    const users = await this.prisma.users.findUnique({
      where: {
        id: raiseIncidentDto.creator_id,
      },
    });
    if (users && users.is_admin) {
      incident = await this.prisma.incident.create({
        data: {
          name: raiseIncidentDto.name,
          type: raiseIncidentDto.type,
          creator_id: raiseIncidentDto.creator_id,
        },
      });
    }

    return incident;
  }

  async assignIncident(
    id: string,
    assignIncidentDto: AssignIncidentDto,
  ): Promise<any> {
    let incident = null;

    const users = await this.prisma.users.findUnique({
      where: {
        id: assignIncidentDto.assignee_id,
      },
    });
    if (users && !users.is_admin) {
      incident = await this.prisma.incident.update({
        where: {
          id: id,
        },
        data: {
          assignee_id: assignIncidentDto.assignee_id,
        },
      });
    }

    return incident;
  }

  async getIncidents(
    creatorId: string,
    assigneeId: string,
    name: string,
    type: string,
    status: Status,
    page: number,
    perPage: number,
    sortBy: string,
    sortOrderDesc: string,
  ): Promise<any> {
    let orderBy = {};

    const sortOrderStr =
      sortOrderDesc && sortOrderDesc === 'true' ? 'desc' : 'asc';
    console.log('sortOrderStr = ', sortOrderStr);

    if (!sortBy) {
      const newOrderBy = {
        created_at: sortOrderStr,
      };
      orderBy = Object.assign(orderBy, newOrderBy);
    } else {
      if (sortBy === 'created_at') {
        const newOrderBy = {
          created_at: sortOrderStr,
        };
        orderBy = Object.assign(orderBy, newOrderBy);
      } else if (sortBy === 'updated_at') {
        const newOrderBy = {
          updated_at: sortOrderStr,
        };
        orderBy = Object.assign(orderBy, newOrderBy);
      } else if (sortBy === 'incident_type') {
        const newOrderBy = {
          type: sortOrderStr,
        };
        orderBy = Object.assign(orderBy, newOrderBy);
      }
    }

    console.log('orderBy = ', orderBy);

    let filterParams: any = {
      include: {
        creator: true,
      },
      skip: perPage * (page - 1),
      take: perPage,
      orderBy: orderBy,
    };

    let whereParams = {};

    if (creatorId) {
      const creatorFilterParams = {
        creator_id: creatorId,
      };
      whereParams = Object.assign(whereParams, creatorFilterParams);
    }

    if (assigneeId) {
      const assigneeFilterParams = {
        assignee_id: assigneeId,
      };
      whereParams = Object.assign(whereParams, assigneeFilterParams);
    }

    if (name) {
      const nameFilterParams = {
        name: name,
      };
      whereParams = Object.assign(whereParams, nameFilterParams);
    }

    if (type) {
      const typeFilterParams = {
        type: type,
      };
      whereParams = Object.assign(whereParams, typeFilterParams);
    }

    if (status) {
      const statusFilterParams = {
        status: status,
      };
      whereParams = Object.assign(whereParams, statusFilterParams);
    }

    console.log('whereParams = ', whereParams);

    if (whereParams) {
      whereParams = {
        where: whereParams,
      };
      filterParams = Object.assign(filterParams, whereParams);
    }

    console.log('filterParams = ', filterParams);

    const incidents = await this.prisma.incident.findMany(filterParams);

    return incidents;
  }

  async getIncidentById(id: string): Promise<any> {
    const incident = await this.prisma.incident.findUnique({
      where: {
        id: id,
      },
      include: {
        creator: true,
      },
    });
    return incident;
  }

  async updateIncidentStatus(
    id: string,
    updateIncidentStatusDto: UpdateIncidentStatusDto,
  ): Promise<any> {
    let incident = null;

    const existingIncident = await this.prisma.incident.findUnique({
      where: {
        id: id,
      },
    });
    if (existingIncident) {
      if (
        (existingIncident.status === Status.NOT_STARTED &&
          updateIncidentStatusDto.status === Status.ACKNOWLEDGE) ||
        (existingIncident.status === Status.ACKNOWLEDGE &&
          updateIncidentStatusDto.status === Status.RESOLVED)
      ) {
        incident = await this.prisma.incident.update({
          where: {
            id: id,
          },
          data: {
            status: updateIncidentStatusDto.status,
          },
          include: {
            creator: true,
          },
        });
      }
    }

    return incident;
  }

  async deleteIncidentById(id: string): Promise<any> {
    const incident = await this.prisma.incident.delete({
      where: {
        id: id,
      },
      include: {
        creator: true,
      },
    });
    return incident;
  }
}
