import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('me')
  async getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }
}
