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

    const existingIncident = await this.prisma.incident.findUnique({
      where: {
        id: id,
      },
    });
    if (
      existingIncident &&
      existingIncident.creator_id &&
      !existingIncident.assignee_id
    ) {
      if (existingIncident.creator_id != assignIncidentDto.assignee_id) {
        incident = await this.prisma.incident.update({
          where: {
            id: id,
          },
          data: {
            assignee_id: assignIncidentDto.assignee_id,
          },
        });
      }
    }

    return incident;
  }

  async getIncidents(
    creatorId: string,
    assigneeId: string,
    page: number,
    perPage: number,
  ): Promise<any> {
    let incidents = await this.prisma.incident.findMany({
      include: {
        creators: true,
      },
      skip: perPage * (page - 1),
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
    });

    if (creatorId) {
      incidents = await this.prisma.incident.findMany({
        where: {
          creator_id: creatorId,
        },
        include: {
          creators: true,
        },
        skip: perPage * (page - 1),
        take: perPage,
        orderBy: {
          created_at: 'desc',
        },
      });
    }

    if (assigneeId) {
      incidents = await this.prisma.incident.findMany({
        where: {
          assignee_id: assigneeId,
        },
        include: {
          creators: true,
        },
        skip: perPage * (page - 1),
        take: perPage,
        orderBy: {
          created_at: 'desc',
        },
      });
    }

    return incidents;
  }

  async getIncidentById(id: string): Promise<any> {
    const incident = await this.prisma.incident.findUnique({
      where: {
        id: id,
      },
      include: {
        creators: true,
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
            creators: true,
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
        creators: true,
      },
    });
    return incident;
  }
}
