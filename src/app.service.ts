import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class AppService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  }

  async getPullRequests(owner: string, repo: string): Promise<any> {
    try {
      const { data } = await this.octokit.pulls.list({
        owner,
        repo,
      });
      return data; // Return the pull requests data
    } catch (error) {
      throw new HttpException('Failed to fetch pull requests', HttpStatus.BAD_REQUEST);
    }
  }
}
