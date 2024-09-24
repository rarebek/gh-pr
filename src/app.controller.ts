import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint to fetch pull requests from a specific GitHub repository
  @Get('github/:owner/:repo/pulls')
  async getPullRequests(@Param('owner') owner: string, @Param('repo') repo: string) {
    try {
      return await this.appService.getPullRequests(owner, repo);
    } catch (error) {
      // Handle the error from the service and throw a corresponding HTTP exception
      throw new HttpException('Failed to fetch pull requests', HttpStatus.BAD_REQUEST);
    }
  }
}
