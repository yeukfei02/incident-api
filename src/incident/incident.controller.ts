import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { RaiseIncidentDto } from './dto/raise-incident.dto';
import { AssignIncidentDto } from './dto/assign-incident.dto';

@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post('/raise')
  async raiseIncident(
    @Body() raiseIncidentDto: RaiseIncidentDto,
  ): Promise<any> {
    const incident = await this.incidentService.raiseIncident(raiseIncidentDto);

    const response = { message: 'raiseIncident', incident: incident };
    return response;
  }

  @Post('/assign')
  async assignIncident(
    @Body() assignIncidentDto: AssignIncidentDto,
  ): Promise<any> {
    const incident = await this.incidentService.assignIncident(
      assignIncidentDto,
    );

    const response = { message: 'assignIncident', incident: incident };
    return response;
  }

  @Get()
  async getIncidents(
    @Query('creator_id') creator_id: string,
    @Query('assignee_id') assignee_id: string,
    @Query('page') page: string,
    @Query('per_page') perPage: string,
  ): Promise<any> {
    const creatorId = creator_id;
    const assigneeId = assignee_id;
    const pageInt = page ? parseInt(page, 10) : 1;
    const perPageInt = page ? parseInt(perPage, 10) : 20;

    const incidents = await this.incidentService.getIncidents(
      creatorId,
      assigneeId,
      pageInt,
      perPageInt,
    );

    const response = {
      message: 'getIncidents',
      data: incidents,
      total: incidents.length,
      page: pageInt,
      limit: perPageInt,
    };
    return response;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<any> {
    const incident = await this.incidentService.getIncidentById(id);

    const response = { message: 'getIncidentById', incident: incident };
    return response;
  }

  @Delete('/:id')
  async deleteIncidentById(@Param('id') id: string): Promise<any> {
    const incident = await this.incidentService.deleteIncidentById(id);

    const response = { message: 'deleteIncidentById', incident: incident };
    return response;
  }
}
