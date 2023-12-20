import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { InquiryService } from './inquiry.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, InquiryService, PrismaService],
})
export class AppModule {}
