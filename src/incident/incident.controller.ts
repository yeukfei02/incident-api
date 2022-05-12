import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { RaiseIncidentDto } from './dto/raise-incident.dto';
import { AssignIncidentDto } from './dto/assign-incident.dto';
import { UpdateIncidentStatusDto } from './dto/update-incident-status.dto';

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

  @Post('/:id/assign')
  async assignIncident(
    @Body() assignIncidentDto: AssignIncidentDto,
    @Param('id') id: string,
  ): Promise<any> {
    const incident = await this.incidentService.assignIncident(
      id,
      assignIncidentDto,
    );

    const response = { message: 'assignIncident', incident: incident };
    return response;
  }

  @Get()
  async getIncidents(
    @Query('creator_id') creator_id: string,
    @Query('assignee_id') assignee_id: string,
    @Query('type') type: string,
    @Query('page') page: string,
    @Query('per_page') perPage: string,
    @Query('sort_by') sortBy: string,
    @Query('sort_order_desc') sortOrderDesc: string,
  ): Promise<any> {
    const creatorId = creator_id;
    const assigneeId = assignee_id;
    const pageInt = page ? parseInt(page, 10) : 1;
    const perPageInt = page ? parseInt(perPage, 10) : 20;

    const incidents = await this.incidentService.getIncidents(
      creatorId,
      assigneeId,
      type,
      pageInt,
      perPageInt,
      sortBy,
      sortOrderDesc,
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
  async getIncidentById(@Param('id') id: string): Promise<any> {
    const incident = await this.incidentService.getIncidentById(id);

    const response = { message: 'getIncidentById', incident: incident };
    return response;
  }

  @Patch('/:id/update-status')
  async updateIncidentStatus(
    @Param('id') id: string,
    @Body() updateIncidentStatusDto: UpdateIncidentStatusDto,
  ): Promise<any> {
    const incident = await this.incidentService.updateIncidentStatus(
      id,
      updateIncidentStatusDto,
    );

    const response = { message: 'updateIncidentStatus', incident: incident };
    return response;
  }

  @Delete('/:id')
  async deleteIncidentById(@Param('id') id: string): Promise<any> {
    const incident = await this.incidentService.deleteIncidentById(id);

    const response = { message: 'deleteIncidentById', incident: incident };
    return response;
  }
}
