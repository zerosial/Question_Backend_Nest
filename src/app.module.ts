import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { InquiryService } from './inquiry.service';
import { AnswerService } from './answer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    InquiryService,
    PrismaService,
    AnswerService,
  ],
})
export class AppModule {}
