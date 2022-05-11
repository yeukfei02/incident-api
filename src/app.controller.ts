import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getMain(): Promise<any> {
    const response = await this.appService.getMain();
    return response;
  }
}
