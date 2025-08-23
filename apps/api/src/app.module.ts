import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { auth } from '@workspace/auth';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule.forRoot(auth), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
