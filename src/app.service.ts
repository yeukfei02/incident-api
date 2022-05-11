import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getMain(): Promise<any> {
    const response = {
      message: 'incident-api',
    };
    return response;
  }
}
